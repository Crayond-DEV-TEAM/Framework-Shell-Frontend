import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { ProfileStyle } from './style';
import { useState, useEffect } from 'react';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Alert, IconButton, SxProps, Theme } from '@mui/material';
import BackIcon from '@assets/backIcon';
import { useAuth, useProfileUserLanding, useUser } from '@core/store';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import { passwordRegex, validateResetPasswordData } from '@core/store/utils';
import { ResetPasswordState } from '@core/store/interface';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { localStorageKeys, parseJwt } from '@core/utils';
import { webRoutes } from '@core/routes';

export interface MyProfileProps {
  onClick?: () => void;
  showpassword: '';
}

export function MyProfile(props: MyProfileProps): JSX.Element {
  const [values, setValues] = useState(false);
  const [password, setPasswordOpen] = useState(false);
  const [showpassword, setPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState({ name: '', mobileno: '', password: '', confirmPassword: '' });

  const {
    getMyProfile,
    MyProfileList,
    editProfileData,
    editProfile,
    seteditMyProfile,
    fileUpload,
    setSelectedFile,
    selectedFile,
  } = useProfileUserLanding();
  const { changePasswordState, setChangePasswordState, changePassword } = useAuth();
  const [imagePresent, setImagePresent] = useState(MyProfileList?.profile_pic?.length > 0);



  const history = useNavigate();

  const handleChange = (key: string, value: string | number) => {
    seteditMyProfile(key, value);
  };
  const handleChangePassword = (key: string, value: string) => {
    setChangePasswordState(key, value);
  };
  const handleOpenProfile = () => {
    setValues(true);
  };
  const handleOpenPassword = () => {
    setPasswordOpen(true);
  };
  const handleClose = () => {
    setValues(false);
    setPasswordOpen(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (editProfile.name.trim().length === 0) {
      errors.name = 'User Name is required';
    }

    if (editProfile.mobileno.trim().length === 0) {
      errors.mobileno = 'Mobile Number is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validatePasswordData = () => {
    const errors: Record<string, string> = {};

    if (changePasswordState.password.trim().length === 0) {
      errors.password = 'Password is required';
    }

    if (changePasswordState.confirmPassword.trim().length === 0) {
      errors.confirmPassword = 'confirm password is required';
    }
    if (
      changePasswordState.confirmPassword.length > 0 &&
      changePasswordState.confirmPassword !== changePasswordState.password
    ) {
      errors.confirmPassword = 'Password and confirm password is not matching';
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    if (validateForm()) {
      editProfileData();
      setValues(false);
    }
  };
  const confirmPassword = () => {
    if (validatePasswordData()) {
      changePassword();
      setPasswordOpen(false);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = () => {
    const authToken = localStorage.getItem(localStorageKeys?.authToken);

    if (authToken) {
      const user = parseJwt(authToken);
      useUser.setState({ user });
      if (user.isSuperAdmin === true) {
        navigate(webRoutes.superAdmin);
      } else {
        navigate('/');
      }
    }
  };

  const handleFileUpload = (file: any) => {
    if (file) {
      fileUpload(file);
    }
  };

  const handleFileChange = (event: File) => {
    const file = event.target.files;
    setSelectedFile(file);
    handleFileUpload(file);
    setImagePresent(true);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    fileUpload(null);
    setImagePresent(false);
  };
  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (MyProfileList) {
      seteditMyProfile('name', MyProfileList.full_name || '');
      seteditMyProfile('mobileno', `+${MyProfileList.mobile_code} ${MyProfileList.mobile_number}` || '');
    }
  }, [MyProfileList]);

  return (
    <Box sx={ProfileStyle.mainBox}>
      <Box sx={ProfileStyle.Box}>
        <Box sx={ProfileStyle.titleBox}>
          <BackIcon style={{ cursor: 'pointer' }} onClick={redirect} />
          <Typography sx={ProfileStyle.head}>My Profile</Typography>
        </Box>
        <Box sx={ProfileStyle.imgBox}>
          <Box sx={ProfileStyle.upload}>
            <Avatar sx={ProfileStyle.avatar1} src={MyProfileList?.profile_pic ?? ''}></Avatar>
            {imagePresent ? (
              <DeleteIcon sx={ProfileStyle.deleteIcon} onClick={handleRemove} />
            ) : (
              <>
                <AddAPhotoIcon sx={ProfileStyle.addImageIcon} />
                <input
                  data-testId="upload"
                  onChange={handleFileChange}
                  type="file"
                  style={ProfileStyle.avatar}
                  accept="image/jpeg, image/*,application/pdf"
                />
              </>
            )}
          </Box>
        </Box>
        <Typography align="center" sx={ProfileStyle.name}>
          {MyProfileList?.full_name ?? '-'}
        </Typography>
        <Box mt={3} pl={2.5}>
          <Typography sx={ProfileStyle.title}>User Name</Typography>
          <Typography sx={ProfileStyle.subtitle}>{MyProfileList?.name ?? '-'}</Typography>
        </Box>
        <Box mt={3} pl={2.5}>
          <Typography sx={ProfileStyle.title}>Email</Typography>
          <Typography sx={ProfileStyle.subtitle}>{MyProfileList?.email_id ?? '-'}</Typography>
        </Box>
        <Box mt={3} pl={2.5}>
          <Typography sx={ProfileStyle.title}>Mobile Number</Typography>
          <Typography sx={ProfileStyle.subtitle}>
            +{MyProfileList?.mobile_code + ' ' + MyProfileList?.mobile_number ?? '-'}
          </Typography>
        </Box>
        <Divider sx={{ mt: 3 }} />
        <Box sx={ProfileStyle.btnBox}>
          <Button variant={'contained'} sx={ProfileStyle.btn} onClick={handleOpenPassword}>
            Reset Password
          </Button>
          <Button variant={'contained'} sx={ProfileStyle.btn} onClick={handleOpenProfile}>
            Edit Profile
          </Button>
        </Box>
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Edit Profile'}
        Bodycomponent={
          <>
            <Box sx={ProfileStyle.padd}>
              <Box sx={ProfileStyle.inputGroupSx}>
                <Label sx={ProfileStyle.labelSx} htmlFor="addTitle">
                  Name
                </Label>
                <Input
                  size="small"
                  placeholder="Name"
                  required
                  value={editProfile.name}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    handleChange('name', e.target.value)
                  }
                  isError={Boolean(formErrors.name)}
                  errorMessage={formErrors.name}
                />
              </Box>
              <Box sx={{ m: '16px' }} />
              <Box sx={ProfileStyle.inputGroupSx}>
                <Label sx={ProfileStyle.labelSx} htmlFor="addTitle">
                  Mobile
                </Label>
                <Input
                  size="small"
                  placeholder="Mobile Number"
                  required
                  value={editProfile.mobileno}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    handleChange('mobileno', e.target.value)
                  }
                  isError={Boolean(formErrors.mobileno)}
                  errorMessage={formErrors.mobileno}
                />
              </Box>
            </Box>{' '}
          </>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={ProfileStyle.dialogSx}
        Footercomponent={<FooterComponent onSave={handleEdit} onCancel={handleClose} sx={{ padding: '4px 0px' }} />}
      />
      <DialogDrawer
        maxModalWidth="sm"
        isDialogOpened={password}
        title={'Change Password'}
        Bodycomponent={
          <Box sx={ProfileStyle.passwordBox}>
            <Box sx={ProfileStyle.inputGroupSx}>
              <Typography sx={ProfileStyle.reset}>Provide us the registered email to reset your password.</Typography>
              <Label sx={ProfileStyle.labelSx} htmlFor="password">
                New Password
              </Label>
              <Input
                id="password"
                type={showpassword ? 'text' : 'password'}
                value={changePasswordState.password}
                placeholder="New password"
                size="small"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChangePassword('password', e.target.value)
                }
                endAdornment={
                  <IconButton onClick={() => setPassword((prevState) => !prevState)} edge="end">
                    {showpassword ? (
                      <VisibilityOff rootStyle={ProfileStyle.eyeSx} />
                    ) : (
                      <Visibility rootStyle={ProfileStyle.eyeSx} />
                    )}
                  </IconButton>
                }
                isError={Boolean(formErrors.password)}
                errorMessage={formErrors.password}
              />
            </Box>
            <Box sx={ProfileStyle.inputGroupConform}>
              <Label sx={ProfileStyle.labelConform} htmlFor="password">
                Confirm Password
              </Label>
              <Box>
                <Input
                  id="confirmPassword"
                  type={showpassword ? 'text' : 'password'}
                  value={changePasswordState.confirmPassword}
                  size="small"
                  placeholder="Confirm Password"
                  textFieldStyle={ProfileStyle.inputpassword}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    handleChangePassword('confirmPassword', e.target.value)
                  }
                  endAdornment={
                    <IconButton onClick={() => setPassword((prevState) => !prevState)} edge="end">
                      {showpassword ? (
                        <VisibilityOff rootStyle={ProfileStyle.eyeSx} />
                      ) : (
                        <Visibility rootStyle={ProfileStyle.eyeSx} />
                      )}
                    </IconButton>
                  }
                  isError={Boolean(formErrors.confirmPassword)}
                  errorMessage={formErrors.confirmPassword}
                />
              </Box>
            </Box>
            <Button variant={'contained'} sx={ProfileStyle.ConfirmBtn} onClick={confirmPassword}>
              Confirm
            </Button>
          </Box>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={ProfileStyle.dialogPassword}
        isFooterRequired={false}
      />
    </Box>
  );
}
