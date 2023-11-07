import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { ProfileStyle } from './style';
import { useState, useEffect } from 'react';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface MyProfileProps {
  onClick?: () => void;
}

export function MyProfile(props: MyProfileProps): JSX.Element {
  const [values, setValues] = useState(false);

  const handleOpen = () => {
    setValues(true);
  };
  const handleClose = () => {
    setValues(false);
  };

  return (
    <Box sx={ProfileStyle.mainBox}>
      <Box sx={ProfileStyle.Box}>
        <Box sx={ProfileStyle.titleBox}>
          <Typography sx={ProfileStyle.head}>My Profile</Typography>
        </Box>
        <Box sx={ProfileStyle.imgBox}>
          <Avatar sx={ProfileStyle.avatar} src="https://picsum.photos/200/300"></Avatar>
        </Box>
        <Typography align="center" sx={ProfileStyle.name}>
          Mike Pearson
        </Typography>
        <Box mt={3} pl={2.5}>
          <Typography sx={ProfileStyle.title}>Email</Typography>
          <Typography sx={ProfileStyle.subtitle}>Michaelbloomberg@email.com</Typography>
        </Box>
        <Box mt={3} pl={2.5}>
          <Typography sx={ProfileStyle.title}>Date Of Birth</Typography>
          <Typography sx={ProfileStyle.subtitle}>01/06/1990</Typography>
        </Box>
        <Box mt={3} pl={2.5}>
          <Typography sx={ProfileStyle.title}>Mobile Number</Typography>
          <Typography sx={ProfileStyle.subtitle}>+91 94875 12031</Typography>
        </Box>
        <Divider sx={{ mt: 3 }} />
        <Box sx={ProfileStyle.btnBox}>
          <Button variant={'contained'} sx={ProfileStyle.btn}>
            Reset Password
          </Button>
          <Button variant={'contained'} sx={ProfileStyle.btn} onClick={handleOpen}>
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
                  First Name
                </Label>
                <Input
                  size="small"
                  placeholder="First Name"
                  required
                  //   value={createEditAdmin.projectTitle}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  //   onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  //     handlechange('projectTitle', e.target.value)
                  //   }
                  // isError={Boolean(formErrors.name)}
                  // errorMessage={formErrors.name}
                />
              </Box>
              <Box sx={{ m: '16px' }} />
              <Box sx={ProfileStyle.inputGroupSx}>
                <Label sx={ProfileStyle.labelSx} htmlFor="addTitle">
                  Last Name
                </Label>
                <Input
                  size="small"
                  placeholder="Last Name"
                  required
                  //   value={createEditAdmin.projectTitle}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  //   onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  //     handlechange('projectTitle', e.target.value)
                  //   }
                  // isError={Boolean(formErrors.name)}
                  // errorMessage={formErrors.name}
                />
              </Box>
              <Box sx={{ m: '16px' }} />

              <Box sx={ProfileStyle.inputGroupSx}>
                <Label sx={ProfileStyle.labelSx} htmlFor="addTitle">
                  Email
                </Label>
                <Input
                  size="small"
                  placeholder="Email"
                  required
                  //   value={createEditAdmin.projectTitle}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  //   onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  //     handlechange('projectTitle', e.target.value)
                  //   }
                  // isError={Boolean(formErrors.name)}
                  // errorMessage={formErrors.name}
                />
              </Box>
              <Box sx={{ m: '16px' }} />

              <Box sx={ProfileStyle.inputGroupSx}>
                <Label sx={ProfileStyle.labelSx} htmlFor="addTitle">
                  Date Of Birth
                </Label>
                <Input
                  size="small"
                  placeholder="Date Of Birth"
                  required
                  //   value={createEditAdmin.projectTitle}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  //   onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  //     handlechange('projectTitle', e.target.value)
                  //   }
                  // isError={Boolean(formErrors.name)}
                  // errorMessage={formErrors.name}
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
                  //   value={createEditAdmin.projectTitle}
                  textFieldStyle={ProfileStyle.inputSx}
                  id="title"
                  //   onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  //     handlechange('projectTitle', e.target.value)
                  //   }
                  // isError={Boolean(formErrors.name)}
                  // errorMessage={formErrors.name}
                />
              </Box>
            </Box>{' '}
          </>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={ProfileStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            // check
            // SwitchChange={(e) => {
            //   handleCreateAddedit('is_active', e.target.checked);
            // }}
            // disabled={editname === true ? editsave : addsave}
            // checked={createEditAddOns.is_active}
            // saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            // onSave={editname === true ? handleEditAddon : handleCreateAddon}
            onCancel={handleClose}
          />
        }
      />
    </Box>
  );
}
