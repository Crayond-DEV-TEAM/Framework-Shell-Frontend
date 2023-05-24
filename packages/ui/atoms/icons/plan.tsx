import { SvgIcon, SvgIconProps } from '@mui/material';
import { IconInterface } from './interface';

export function Test(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    height: 22,
    width: 22,
    color: '#fff',
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" {...rest} sx={rootSx}>
      <g id="Group_94692" data-name="Group 94692" transform="translate(-1322 -20)">
        <rect
          id="Rectangle_43748"
          data-name="Rectangle 43748"
          width="32"
          height="32"
          transform="translate(1322 20)"
          fill="none"
        />
        <g id="Group_90920" data-name="Group 90920" transform="translate(1327.333 25.333)">
          <rect
            id="Rectangle_46698"
            data-name="Rectangle 46698"
            width="22"
            height="22"
            transform="translate(-0.333 -0.333)"
            fill="none"
          />
          <path
            id="icons8-expand-arrow"
            d="M17.7,12.223l-6.7,6.7-6.7-6.7A.762.762,0,1,0,3.223,13.3l7.238,7.238a.762.762,0,0,0,1.077,0L18.777,13.3A.762.762,0,1,0,17.7,12.223Z"
            transform="translate(-0.333 -5.397)"
            fill="#fff"
          />
        </g>
      </g>
    </SvgIcon>
  );
}

export function BackButton(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    height: 12,
    width: 13,
    color: '#fff',
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="13.406"
      height="11.547"
      viewBox="0 0 13.406 11.547"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-down-50"
        d="M14.76,5.978a.558.558,0,0,0-.55.566V17.479L9.953,13.221a.558.558,0,1,0-.79.789l5.211,5.21a.558.558,0,0,0,.789,0l5.211-5.211a.558.558,0,1,0-.789-.789l-4.258,4.258V6.545a.558.558,0,0,0-.567-.566Z"
        transform="translate(19.385 -9) rotate(90)"
        fill="#3b3b3b"
      />
    </SvgIcon>
  );
}
export function UploadButton(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="22.47"
      height="14.512"
      viewBox="0 0 22.47 14.512"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-upload-to-cloud-50"
        d="M11.235,7a6.8,6.8,0,0,0-6.75,6.086H4.213a4.213,4.213,0,1,0,0,8.426H9.25a2.05,2.05,0,0,1-.122-.7v-.7H4.213a2.809,2.809,0,1,1,0-5.617h.936a.7.7,0,0,0,.7-.7,5.383,5.383,0,1,1,10.767,0,.7.7,0,0,0,.7.7h.936a2.809,2.809,0,1,1,0,5.617H13.342v.7a2.05,2.05,0,0,1-.122.7h5.037a4.213,4.213,0,1,0,0-8.426h-.272A6.8,6.8,0,0,0,11.235,7ZM11.2,12.15a.7.7,0,0,0-.444.188L7.245,15.616A.7.7,0,1,0,8.2,16.641l2.33-2.173V20.81a.7.7,0,1,0,1.4,0V14.468l2.33,2.173a.7.7,0,1,0,.958-1.026l-3.511-3.277A.7.7,0,0,0,11.2,12.15Z"
        transform="translate(0 -7)"
        fill="#5a5a5a"
      />
    </SvgIcon>
  );
}

export function CustomPlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="14.4" height="18" viewBox="0 0 14.4 18" {...rest} sx={rootSx}>
      <path
        id="icons8-account-50"
        d="M15.2,4a4.5,4.5,0,1,0,4.5,4.5A4.51,4.51,0,0,0,15.2,4Zm0,1.35A3.15,3.15,0,1,1,12.05,8.5,3.14,3.14,0,0,1,15.2,5.35ZM10.025,14.8A2.035,2.035,0,0,0,8,16.825v.54a4.081,4.081,0,0,0,2.119,3.327A9.47,9.47,0,0,0,15.2,22a9.471,9.471,0,0,0,5.081-1.309A4.081,4.081,0,0,0,22.4,17.365v-.54A2.035,2.035,0,0,0,20.375,14.8Zm0,1.35h10.35a.665.665,0,0,1,.675.675v.54a2.742,2.742,0,0,1-1.5,2.188,8.206,8.206,0,0,1-4.355,1.1,8.206,8.206,0,0,1-4.355-1.1,2.742,2.742,0,0,1-1.5-2.188v-.54A.665.665,0,0,1,10.025,16.15Z"
        transform="translate(-8 -4)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
export function SubscriptionPlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="18.02"
      height="18.02"
      viewBox="0 0 18.02 18.02"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-cheque-50"
        d="M7.126,5a.711.711,0,0,0-.7.711V20.174a1.423,1.423,0,0,0,0,2.845H21.6a1.423,1.423,0,0,0,0-2.845V5.711a.711.711,0,0,0-1.106-.592l-1.76,1.173L16.747,5.1a.711.711,0,0,0-.732,0L14.01,6.3,12,5.1a.711.711,0,0,0-.732,0L9.288,6.292,7.528,5.119A.711.711,0,0,0,7.126,5Zm4.513,1.541,2.005,1.2a.711.711,0,0,0,.732,0l2.005-1.2,2.005,1.2a.711.711,0,0,0,.76-.019l1.028-.685V21.6H7.845V7.04l1.028.685a.711.711,0,0,0,.76.019Zm-1.66,3.675a.711.711,0,1,0,0,1.423h8.062a.711.711,0,1,0,0-1.423Zm0,3.794a.711.711,0,1,0,0,1.423h4.268a.711.711,0,1,0,0-1.423Zm7.113,0a.711.711,0,1,0,0,1.423h.948a.711.711,0,1,0,0-1.423ZM9.979,16.855a.711.711,0,1,0,0,1.423H13.3a.711.711,0,1,0,0-1.423Zm7.113,0a.711.711,0,1,0,0,1.423h.948a.711.711,0,1,0,0-1.423Z"
        transform="translate(-5 -4.999)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
export function PlansPlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="14.4" height="18" viewBox="0 0 14.4 18" {...rest} sx={rootSx}>
      <path
        id="icons8-test-passed-50"
        d="M13.625,4a2.03,2.03,0,0,0-2,1.8h-1.6A2.035,2.035,0,0,0,8,7.825v12.15A2.035,2.035,0,0,0,10.025,22h10.35A2.035,2.035,0,0,0,22.4,19.975V7.825A2.035,2.035,0,0,0,20.375,5.8h-1.6a2.03,2.03,0,0,0-2-1.8Zm0,1.35h3.15a.675.675,0,0,1,0,1.35h-3.15a.675.675,0,0,1,0-1.35Zm-3.6,1.8h1.921a2.03,2.03,0,0,0,1.679.9h3.15a2.03,2.03,0,0,0,1.679-.9h1.921a.665.665,0,0,1,.675.675v12.15a.665.665,0,0,1-.675.675H10.025a.665.665,0,0,1-.675-.675V7.825A.665.665,0,0,1,10.025,7.15Zm8.987,3.594a.675.675,0,0,0-.464.2l-1.323,1.323-.423-.423a.675.675,0,1,0-.954.954l.9.9a.675.675,0,0,0,.954,0l1.8-1.8a.675.675,0,0,0-.49-1.158Zm-7.637.906a.675.675,0,1,0,0,1.35h2.7a.675.675,0,1,0,0-1.35Zm7.637,2.919a.675.675,0,0,0-.464.2L17.225,16.1l-.423-.423a.675.675,0,1,0-.954.954l.9.9a.675.675,0,0,0,.954,0l1.8-1.8a.675.675,0,0,0-.49-1.158ZM11.375,15.7a.675.675,0,1,0,0,1.35h2.7a.675.675,0,1,0,0-1.35Z"
        transform="translate(-8 -4)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
export function AddPlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="17.091"
      height="18.89"
      viewBox="0 0 17.091 18.89"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-add-document-50"
        d="M10.024,4A2.026,2.026,0,0,0,8,6.024V19.967a2.026,2.026,0,0,0,2.024,2.024h5.907a5.856,5.856,0,0,1-.971-1.349H10.024a.675.675,0,0,1-.675-.675V6.024a.675.675,0,0,1,.675-.675H15.2V9.172A2.026,2.026,0,0,0,17.22,11.2h3.823v.976a5.813,5.813,0,0,1,1.349.372V10.521a.67.67,0,0,0-.2-.476L16.348,4.2a.673.673,0,0,0-.477-.2Zm6.522,2.3,3.543,3.543H17.22a.675.675,0,0,1-.675-.675ZM20.144,13a4.947,4.947,0,1,0,4.947,4.947A4.947,4.947,0,0,0,20.144,13Zm-7.871.45a.675.675,0,0,0,0,1.349h2.949a5.873,5.873,0,0,1,1.187-1.349Zm7.871.9a.45.45,0,0,1,.45.45v2.7h2.7a.45.45,0,1,1,0,.9h-2.7v2.7a.45.45,0,1,1-.9,0v-2.7H17a.45.45,0,1,1,0-.9h2.7v-2.7A.45.45,0,0,1,20.144,14.345Zm-7.871,2.249a.675.675,0,0,0,0,1.349H14.3a5.854,5.854,0,0,1,.162-1.349Z"
        transform="translate(-8 -4)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
export function ChargesPlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="18.02"
      height="12.871"
      viewBox="0 0 18.02 12.871"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-bonds-50"
        d="M5.36,10A2.37,2.37,0,0,0,3,12.36v8.152a2.37,2.37,0,0,0,2.36,2.36h13.3a2.37,2.37,0,0,0,2.36-2.36V12.36A2.37,2.37,0,0,0,18.66,10Zm0,1.287h1a2.774,2.774,0,0,1-2.069,2.069v-1A1.063,1.063,0,0,1,5.36,11.287Zm2.3,0h8.693a4.086,4.086,0,0,0,3.376,3.376v3.545a4.086,4.086,0,0,0-3.376,3.376H7.663a4.086,4.086,0,0,0-3.376-3.376V14.663A4.086,4.086,0,0,0,7.663,11.287Zm10,0h1a1.063,1.063,0,0,1,1.073,1.073v1A2.774,2.774,0,0,1,17.664,11.287Zm-5.653,1.287a.644.644,0,0,0-.644.644V13.5a1.855,1.855,0,0,0-1.386,1.751A1.825,1.825,0,0,0,11.8,17.079h.528a.536.536,0,1,1,0,1.073H11.6a.554.554,0,0,1-.514-.288.644.644,0,0,0-1.151.577,1.831,1.831,0,0,0,1.434.982v.231a.644.644,0,1,0,1.287,0v-.247a1.821,1.821,0,0,0-.322-3.614H11.8a.537.537,0,0,1-.536-.536.573.573,0,0,1,.577-.536h.364a.49.49,0,0,1,.513.288.644.644,0,0,0,1.152-.577,1.731,1.731,0,0,0-1.219-.95v-.263A.644.644,0,0,0,12.011,12.574Zm-4.72,3a.858.858,0,1,0,.858.858A.858.858,0,0,0,7.29,15.578Zm9.439,0a.858.858,0,1,0,.858.858A.858.858,0,0,0,16.73,15.578ZM4.287,19.515a2.774,2.774,0,0,1,2.069,2.069h-1a1.063,1.063,0,0,1-1.073-1.073Zm15.446,0v1a1.063,1.063,0,0,1-1.073,1.073h-1A2.774,2.774,0,0,1,19.733,19.515Z"
        transform="translate(-3 -10)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
export function FeaturePlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="18" height="16.2" viewBox="0 0 18 16.2" {...rest} sx={rootSx}>
      <path
        id="icons8-people-50"
        d="M13,6a2.68,2.68,0,0,0-2.023.86,2.841,2.841,0,0,0,0,3.681,2.811,2.811,0,0,0,4.046,0,2.841,2.841,0,0,0,0-3.681A2.68,2.68,0,0,0,13,6Zm-5.85.9a2.245,2.245,0,0,0-1.686.719,2.359,2.359,0,0,0,0,3.062A2.245,2.245,0,0,0,7.15,11.4a2.245,2.245,0,0,0,1.686-.719,2.359,2.359,0,0,0,0-3.062A2.245,2.245,0,0,0,7.15,6.9Zm11.7,0a2.245,2.245,0,0,0-1.686.719,2.359,2.359,0,0,0,0,3.062,2.336,2.336,0,0,0,3.371,0,2.359,2.359,0,0,0,0-3.062A2.245,2.245,0,0,0,18.85,6.9ZM13,7.35a1.244,1.244,0,0,1,1.014.406,1.495,1.495,0,0,1,0,1.888A1.244,1.244,0,0,1,13,10.05a1.244,1.244,0,0,1-1.014-.406,1.495,1.495,0,0,1,0-1.888A1.244,1.244,0,0,1,13,7.35Zm-5.85.9a.81.81,0,0,1,.677.265,1.014,1.014,0,0,1,0,1.269.81.81,0,0,1-.677.265.81.81,0,0,1-.677-.265,1.014,1.014,0,0,1,0-1.269A.81.81,0,0,1,7.15,8.25Zm11.7,0a.81.81,0,0,1,.677.265,1.014,1.014,0,0,1,0,1.269,1,1,0,0,1-1.354,0,1.014,1.014,0,0,1,0-1.269A.81.81,0,0,1,18.85,8.25ZM5.575,12.3A1.577,1.577,0,0,0,4,13.875V16.8a3.6,3.6,0,0,0,3.6,3.6,3.517,3.517,0,0,0,.927-.121,5.025,5.025,0,0,1-.405-1.292,2.212,2.212,0,0,1-.522.063A2.251,2.251,0,0,1,5.35,16.8V13.875a.223.223,0,0,1,.225-.225H8.063a2.432,2.432,0,0,1,.554-1.35Zm4.95,0A1.585,1.585,0,0,0,8.95,13.875V18.15a4.05,4.05,0,0,0,8.1,0V13.875A1.585,1.585,0,0,0,15.475,12.3Zm6.858,0a2.432,2.432,0,0,1,.554,1.35h2.488a.223.223,0,0,1,.225.225V16.8a2.251,2.251,0,0,1-2.25,2.25,2.212,2.212,0,0,1-.522-.063,5.025,5.025,0,0,1-.405,1.292,3.517,3.517,0,0,0,.927.121A3.6,3.6,0,0,0,22,16.8V13.875A1.577,1.577,0,0,0,20.425,12.3Zm-6.858,1.35h4.95a.215.215,0,0,1,.225.225V18.15a2.7,2.7,0,0,1-5.4,0V13.875A.215.215,0,0,1,10.525,13.65Z"
        transform="translate(-4 -6)"
        fill="#fff"
      />
    </SvgIcon>
  );
}

export function SettingPlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="17.63"
      height="18.36"
      viewBox="0 0 17.63 18.36"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-settings"
        d="M13.61,4a9.2,9.2,0,0,0-2.088.247.689.689,0,0,0-.528.6l-.146,1.332a1.376,1.376,0,0,1-1.923,1.11h0L7.7,6.746a.689.689,0,0,0-.78.16,9.163,9.163,0,0,0-2.1,3.613.689.689,0,0,0,.252.755l1.086.8a1.377,1.377,0,0,1,0,2.221l-1.086.8a.689.689,0,0,0-.252.755,9.16,9.16,0,0,0,2.1,3.614.689.689,0,0,0,.78.159l1.224-.539a1.378,1.378,0,0,1,1.924,1.111l.146,1.332a.689.689,0,0,0,.527.6,8.952,8.952,0,0,0,4.177,0,.689.689,0,0,0,.528-.6l.146-1.332a1.377,1.377,0,0,1,1.923-1.111l1.225.539a.689.689,0,0,0,.78-.159,9.166,9.166,0,0,0,2.1-3.614.689.689,0,0,0-.252-.755l-1.086-.8a1.377,1.377,0,0,1,0-2.221l1.086-.8a.689.689,0,0,0,.252-.755,9.166,9.166,0,0,0-2.1-3.614.689.689,0,0,0-.78-.159l-1.225.539a1.377,1.377,0,0,1-1.923-1.111l-.146-1.332a.689.689,0,0,0-.527-.6A9.177,9.177,0,0,0,13.61,4Zm0,1.377a7.5,7.5,0,0,1,1.307.156L15,6.325A2.755,2.755,0,0,0,18.85,8.546l.728-.32a7.738,7.738,0,0,1,1.311,2.26l-.645.473a2.754,2.754,0,0,0,0,4.441l.645.473a7.738,7.738,0,0,1-1.311,2.26l-.728-.32A2.755,2.755,0,0,0,15,20.035l-.086.792a7.522,7.522,0,0,1-1.307.156,7.5,7.5,0,0,1-1.307-.156l-.086-.792A2.755,2.755,0,0,0,8.37,17.814l-.728.32a7.733,7.733,0,0,1-1.311-2.26l.645-.473a2.755,2.755,0,0,0,0-4.442l-.645-.473a7.734,7.734,0,0,1,1.312-2.26l.727.32a2.754,2.754,0,0,0,3.847-2.221l.086-.792A7.522,7.522,0,0,1,13.61,5.377Zm0,4.131a3.672,3.672,0,1,0,3.672,3.672A3.682,3.682,0,0,0,13.61,9.508Zm0,1.377a2.295,2.295,0,1,1-2.295,2.295A2.285,2.285,0,0,1,13.61,10.885Z"
        transform="translate(-4.795 -4)"
        fill="#fff"
      />
    </SvgIcon>
  );
}

export function HomePlan(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="17.077"
      height="18.5"
      viewBox="0 0 17.077 18.5"
      {...rest}
      sx={rootSx}
    >
      <path
        id="icons8-home"
        d="M14.515,4a.712.712,0,0,0-.417.153L7.356,9.464A3.56,3.56,0,0,0,6,12.258v9.055A1.2,1.2,0,0,0,7.186,22.5h4.744a1.2,1.2,0,0,0,1.186-1.186V16.57a.227.227,0,0,1,.237-.237h2.372a.227.227,0,0,1,.237.237v4.744A1.2,1.2,0,0,0,17.147,22.5h4.744a1.2,1.2,0,0,0,1.186-1.186V12.258A3.56,3.56,0,0,0,21.72,9.464L14.978,4.152A.712.712,0,0,0,14.515,4Zm.023,1.618,6.3,4.965a2.132,2.132,0,0,1,.813,1.676v8.818H17.384V16.57a1.671,1.671,0,0,0-1.66-1.66H13.352a1.671,1.671,0,0,0-1.66,1.66v4.506H7.423V12.258a2.132,2.132,0,0,1,.813-1.676Z"
        transform="translate(-6 -3.999)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
export function MorePlanIcon(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="13" height="3" viewBox="0 0 13 3" {...rest} sx={rootSx}>
      <g id="Group_106650" data-name="Group 106650" transform="translate(253 -283) rotate(90)">
        <g
          id="Ellipse_129864"
          data-name="Ellipse 129864"
          transform="translate(283 253) rotate(-90)"
          fill="#357968"
          stroke="#707070"
          stroke-width="1"
        >
          <circle cx="1.5" cy="1.5" r="1.5" stroke="none" />
          <circle cx="1.5" cy="1.5" r="1" fill="none" />
        </g>
        <g
          id="Ellipse_129865"
          data-name="Ellipse 129865"
          transform="translate(283 248) rotate(-90)"
          fill="#357968"
          stroke="#707070"
          stroke-width="1"
        >
          <circle cx="1.5" cy="1.5" r="1.5" stroke="none" />
          <circle cx="1.5" cy="1.5" r="1" fill="none" />
        </g>
        <g
          id="Ellipse_129866"
          data-name="Ellipse 129866"
          transform="translate(283 243) rotate(-90)"
          fill="#357968"
          stroke="#707070"
          stroke-width="1"
        >
          <circle cx="1.5" cy="1.5" r="1.5" stroke="none" />
          <circle cx="1.5" cy="1.5" r="1" fill="none" />
        </g>
      </g>
    </SvgIcon>
  );
}
