import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateCustomer } from '../../store/actions/customerActions';

// Definisikan schema validasi dengan Zod
const customerSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters"),
  phoneNumber: z.string().min(10, "Minimum 10 characters"),
  address: z.string().min(3, "Minimum 3 characters"),
});

const EditCustomerModal = ({ handleClose, customer }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authData.token);

  // Inisialisasi useForm dengan zodResolver
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
      });
    }
  }, [customer, reset]);

  const onSubmit = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.put(`/customers`, data, { headers });

      if (response.status === 200) {
        toast.success("Update Success");
        dispatch(updateCustomer(data));
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Update failed");
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              {...register("phoneNumber")}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...register("address")}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default EditCustomerModal;