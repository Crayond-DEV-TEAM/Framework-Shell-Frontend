import type { SxProps, Theme } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { alertConfig_style } from './style';
import { SubHeader } from '@components/commonComponents';
import { EmailTab } from '../emailTab';
import { SmsTab } from '../smsTab';
import { PushNotification } from '../pushNotification';
import { useAlertConfig, useSlug } from '@core/store';
import { SlackTab } from '@components/slackTab';
import { WhatsappTab } from '@components/whatsappTab';

export interface AlertConfigProps {
  data?: any;
  value?: any;
  updateState?: any;
  tabs?: any;
  newValue?: any;
  onChange?: any;
  sx?: SxProps<Theme>;
}

export function AlertConfig(props: AlertConfigProps): JSX.Element {
  const [index, setindex] = React.useState(0);

  const { getEmailConfig, getPushConfig, getSmsConfig, getSlackConfig, getWhatsappConfig } = useAlertConfig();

  const { slugs } = useSlug();

  const alertConfigTab = ['Email', 'SMS', 'Push Notification', 'Slack', 'Whatsapp'];

  const handleAlertTab = (i: any) => {
    setindex(i);
  };

  useEffect(() => {
    if (slugs?.ALERTSHUB) {
      getEmailConfig();
      getSmsConfig();
      getPushConfig();
      getSlackConfig();
      getWhatsappConfig();
    }
  }, [slugs?.ALERTSHUB]);

  return (
    <Box sx={alertConfig_style.root}>
      <SubHeader title="Alert Configurations" />
      <Box sx={alertConfig_style.referenceDiv} mb={2}>
        <Stack direction="row" sx={alertConfig_style.sampleTabBHead}>
          {alertConfigTab?.map((e, i) => {
            return (
              <Typography
                key={i}
                pt={2}
                pb={2}
                onClick={() => handleAlertTab(i)}
                sx={i === index ? alertConfig_style.alertConfigTabTxt : alertConfig_style.alertConfigTab}
              >
                {e}
              </Typography>
            );
          })}
        </Stack>
        <Box sx={alertConfig_style.referenceDiv2} mb={2}>
          <Box p={3} pl={4} pr={4} sx={alertConfig_style.tabDivs}>
            {index === 0 && <EmailTab />}
            {index === 1 && <SmsTab />}
            {index === 2 && <PushNotification />}
            {index === 3 && <SlackTab />}
            {index === 4 && <WhatsappTab />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
