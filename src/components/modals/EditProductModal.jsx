import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/actions/productActions';
import { toast } from 'sonner';
import { axiosInstance } from '../../lib/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Definisikan schema validasi dengan Zod
const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive").min(1000, "Minimal Rp. 1000"),
  type: z.string().min(1, "Type is required"),
});

const EditProductModal = ({ handleClose, product }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authData.token);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    },
  });

  useEffect(() => {
    if (product) {
      setValue('id', product.id);
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('type', product.type);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.put('/products/', data, { headers });

      if (response.status === 200) {
        toast.success('Update Success');
        dispatch(updateProduct(data));
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Update Failed');
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const numberValue = parseFloat(value);
    setValue('price', numberValue);
  };

  const price = watch('price');
  const formattedPrice = formatRupiah(price);

  const dummyTypes = ['Kg', 'Pcs'];

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register('name')}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={formattedPrice}
              onChange={handlePriceChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formType" className="mt-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              {...register('type')}
              isInvalid={!!errors.type}
            >
              <option value="" disabled>Select type</option>
              {dummyTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.type?.message}
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

export default EditProductModal;
