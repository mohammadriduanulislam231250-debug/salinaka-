import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import Total from './Total';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket } from '@/redux/actions/basketActions';
import firebase from '@/services/firebase';

const FormSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Name should be at least 4 characters.').required('Name is required'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Card number is required.'),
  expiry: Yup.date().required('Credit card expiry is required.'),
  ccv: Yup.string()
    .min(3, 'CCV length should be 3-4 digit')
    .max(4, 'CCV length should only be 3-4 digit')
    .required('CCV is required.'),
  type: Yup.string().required('Please select paymend mode'),
});

const Payment = ({ shipping, payment, subtotal, basket }) => {
  useDocumentTitle('Check Out Final Step | Salinaka');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal',
  };

  const onConfirm = async () => {
    console.log('onConfirm called');
    console.log('Auth:', auth);
    console.log('Basket:', basket);
    try {
      // Create order object
      const orderId = firebase.generateOrderKey();
      console.log('Generated order ID:', orderId);
      const order = {
        id: orderId,
        items: basket,
        shipping,
        subtotal,
        status: 'confirmed',
      };
      console.log('Order object:', order);

      // Save order to Firebase
      console.log('Saving order for user:', auth.id);
      await firebase.addOrder(auth.id, order);
      console.log('Order saved successfully!');

      displayActionMessage('Payment Successful! Order placed.', 'success');
      dispatch(clearBasket());
      history.push('/');
    } catch (error) {
      console.error('Failed to save order:', error);
      displayActionMessage('Payment failed. Please try again.', 'error');
    }
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'paypal') {
            // displayActionMessage('Feature not ready yet :)', 'info');
          }
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <Total isInternational={shipping.isInternational} subtotal={subtotal} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool,
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string,
  }).isRequired,
  subtotal: PropType.number.isRequired,
  basket: PropType.array.isRequired,
};

export default withCheckout(Payment);
