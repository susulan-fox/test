import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setCustomers } from "../../store/actions/customerActions";
import { setProducts } from "../../store/actions/productActions";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";
import { Modal, Button, Form } from "react-bootstrap";
import { addTransaction } from "../../store/actions/transactionActions.js";

const transactionSchema = z.object({
    customerId: z.string().nonempty("Pilih nama konsumen"),
    productId: z.string().nonempty("Pilih paket laundry"),
    quantity: z.number().min(1, "Jumlah harus lebih dari 0"),
});

const CreateTransactionModal = ({ handleClose }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const customers = useSelector((state) => state.customer.customers);
    const token = useSelector((state) => state.auth.authData.token);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(transactionSchema),
        mode: "onSubmit",
        defaultValues: {
            customerId: "",
            productId: "",
            quantity: 0,
        }
    });

    const selectedProduct = watch("productId");
    const quantity = watch("quantity");

    const createTransaction = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const payload = {
                customerId: data.customerId,
                billDetails: [
                    {
                        product: {
                            id: data.productId,
                        },
                        qty: data.quantity,
                    },
                ],
            };
            const response = await axiosInstance.post("/bills", payload, { headers });
            const newTrans = response.data.data;
            if (response.status === 201) {
                toast.success("Transaction Created Successfully");
                dispatch(addTransaction(newTrans));
                setTimeout(() => {
                    handleClose();
                }, 500);
            } else {
                toast.error("Transaction Failed");
            }
        } catch (error) {
            if (error?.response?.data?.status?.description) {
                toast.error("Data Tidak Valid");
            } else {
                console.log(error);
                toast.error("Create Transaction Failed");
            }
        }
    };

    // get product data
    const getProducts = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axiosInstance.get("/products", { headers });
            dispatch(setProducts(response.data.data));
        } catch (error) {
            console.log(error.message);
        }
    };

    // get customer data
    const getCustomers = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axiosInstance.get("/customers", { headers });
            dispatch(setCustomers(response.data.data));
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatRupiah = (value) => {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    useEffect(() => {
        getProducts();
        getCustomers();
    }, []);

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(createTransaction)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Konsumen</Form.Label>
                        <Form.Control
                            as="select"
                            {...register("customerId")}
                            isInvalid={errors.customerId}
                        >
                            <option value="" disabled>Pilih Nama Konsumen</option>
                            {customers.map((customer, index) => (
                                <option key={customer.id} value={customer.id} disabled={index > 1}>
                                    {index > 1 ? `${customer.name} (tidak dapat dipilih)` : customer.name}
                                </option>
                            ))}
                        </Form.Control>
                        {errors.customerId && (
                            <Form.Control.Feedback type="invalid">
                                {errors.customerId.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pilih Paket Laundry</Form.Label>
                        <Form.Control
                            as="select"
                            {...register("productId")}
                            isInvalid={errors.productId}
                        >
                            <option value="" disabled>Pilih Paket Laundry</option>
                            {products.map((product, index) => (
                                <option key={product.id} value={product.id} disabled={index > 1}>
                                    {index > 1 ? `${product.name} (tidak dapat dipilih)` : product.name}
                                </option>
                            ))}
                        </Form.Control>
                        {errors.productId && (
                            <Form.Control.Feedback type="invalid">
                                {errors.productId.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Qty ({products.find((product) => product.id === selectedProduct)?.type})</Form.Label>
                        <Form.Control
                            type="number"
                            {...register("quantity", { valueAsNumber: true })}
                            isInvalid={errors.quantity}
                        />
                        {errors.quantity && (
                            <Form.Control.Feedback type="invalid">
                                {errors.quantity.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Total Harga</Form.Label>
                        <Form.Control
                            type="text"
                            value={formatRupiah(products.find((product) => product.id === selectedProduct)?.price * quantity || 0)}
                            disabled
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit(createTransaction)}>
                    Submit
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CreateTransactionModal;
