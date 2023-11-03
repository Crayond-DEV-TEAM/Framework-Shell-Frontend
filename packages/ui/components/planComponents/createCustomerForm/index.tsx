import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import { DialogDrawer } from '@atoms/dialogDrawer';

import { createCustomerFormStyle } from './style';
import { CustomerHeader } from '@atoms/customerHeader';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { AddressForm, CreateFormDetails } from '..';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { useState } from 'react';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '@core/store';

export interface CreateCustomerFormProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CreateCustomerForm = (props: CreateCustomerFormProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { setCustomerList, createEditCustomer, createCustomer, editCustomer, clearAll, isEdit } = useCustomer();
  const [values, setValues] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (key: any, value: any) => {
    setCustomerList(key, value);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditCustomer.name.length === 0) {
      errors.name = 'Name is required';
    }
    if (createEditCustomer.email_id.length === 0) {
      errors.email_id = 'Email is required';
    }
    if (createEditCustomer.contact_number.length === 0) {
      errors.contact_number = 'Contact number is required';
    }

    if (createEditCustomer.company_name.length === 0) {
      errors.company_name = 'Company name is required';
    }

    if (createEditCustomer.address_line.length === 0) {
      errors.address_line = 'Address is required';
    }

    if (createEditCustomer.city.length === 0) {
      errors.city = 'City is required';
    }

    if (createEditCustomer.state.length === 0) {
      errors.state = 'State is required';
    }

    if (createEditCustomer.country.length === 0) {
      errors.country = 'Country is required';
    }
    if (!createEditCustomer.pincode) {
      errors.pincode = 'Pincode is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onchangeRoute = () => {
    navigate(planSubscriptionRoutes.customer);
    clearAll();
  };

  const handleSave = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      createCustomer();
      navigate(planSubscriptionRoutes.customer);
      clearAll();
    }
  };
  const handleedit = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      editCustomer();
      navigate(planSubscriptionRoutes.customer);
      clearAll();
    }
  };

  return (
    <Box
      sx={[
        {
          ...createCustomerFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <CustomerHeader
        isback={false}
        title={' Create New Customer'}
        onSave={isEdit ? handleedit : handleSave}
        onCancel={onchangeRoute}
      />
      <Box sx={createCustomerFormStyle.content}>
        <CustomerCardComponent
          title={' Company  Details'}
          body={
            <CreateFormDetails
              handleChange={handleChange}
              createEditCustomer={createEditCustomer}
              formErrors={formErrors}
            />
          }
          sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        />
        <Box sx={{ border: '1px solid #EAEAEA' }} />
        <CustomerCardComponent
          title={'Billing Address'}
          body={
            <AddressForm handleChange={handleChange} createEditCustomer={createEditCustomer} formErrors={formErrors} />
          }
          sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        />
      </Box>
    </Box>
  );
};
