import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'sonner';
import { addProduct } from '../../store/actions/productActions';

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive").min(1000, "Minimal Rp. 1000"),
  type: z.string().min(1, "Type is required"),
});

const CreateProductModal = ({ handleClose }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.authData.token);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post('/products/', data, { headers });

      if (response.status === 201) {
        toast.success('Product Created Successfully');
        dispatch(addProduct(response.data.data));
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('Wajib Login Menggunakan Akun Admin');
      } else {
        console.log(error.message);
        toast.error('Product Creation Failed');
      }
    }
  };

  const dummyTypes = ["Kg", "Pcs"];
  const price = watch('price');

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const numberValue = Number(value);
    setValue('price', numberValue, { shouldValidate: true });
  };


  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
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
              value={price ? formatRupiah(price) : ''}
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
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default CreateProductModal;
