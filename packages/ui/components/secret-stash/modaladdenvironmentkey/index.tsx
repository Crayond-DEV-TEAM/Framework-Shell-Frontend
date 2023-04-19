import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { modalAddEnvironmentKeyStyle } from './style';

export interface ModalAddEnvironmentKeyProps {
  className?: string;
  title?: string;
  description?: string;
  handleChange?: (key: string, value: string) => void;
  groupState?: any;
  sx?: SxProps<Theme>;
}

export const ModalAddEnvironmentKey = (props: ModalAddEnvironmentKeyProps): JSX.Element => {
  const {
    className = '',
    title = '',
    description = '',
    sx = {},
    handleChange = () => false,
    groupState,
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...modalAddEnvironmentKeyStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={modalAddEnvironmentKeyStyle.inputGroupSx}>
          <Label sx={modalAddEnvironmentKeyStyle.labelSx} htmlFor="addTitle" isRequired>
            {title}
          </Label>
          <Input
            size="small"
            placeholder=" Add Name"
            value={groupState?.title}
            id="Name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('name', e?.target?.value)
            }
            textFieldStyle={modalAddEnvironmentKeyStyle.inputSx}
            // isError={groupState?.error?.addTitle ? true : false}
            // errorMessage={groupState?.error?.addTitle ?? ''}
          />
        </Box>
        <Box sx={modalAddEnvironmentKeyStyle.inputGroupSx}>
          <Label sx={modalAddEnvironmentKeyStyle.labelSx} htmlFor="description" isRequired>
            {description}
          </Label>
          <Input
            size="small"
            placeholder="Add Repository Url"
            value={groupState?.description}
            id="Webhook_url"
            // textFieldStyle={{ height: '112px' }}
            textFieldStyle={modalAddEnvironmentKeyStyle.inputSx}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('Webhook_url', e.target.value)
            }
            // isError={groupState?.error?.addDescription ? true : false}
            // errorMessage={groupState?.error?.addDescription ?? ''}
          />
        </Box>
      </Box>
    </Box>
  );
};
