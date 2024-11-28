import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
// import { NotAuth } from "../../hoc/checkAuth";

const validateForm = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Email tidak valid"),
  username: z.string().min(5, "Username minimal 5 karakter"),
  password: z.string().min(5, "Password minimal 5 karakter"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { isValid } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
    mode: "onChange",
  });

  const registerUser = async (data) => {
    try {
      const userData = { ...data, role: "employee" }
      const response = await axiosInstance.post("/auth/register", userData);
      toast.success("Register Success");
      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Register Failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-page vh-100 vw-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="login-form-container">
            <div className="text-center mb-4">
              <h2>Daftar Akun Baru</h2>
            </div>
            <Form onSubmit={handleSubmit(registerUser)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nama</Form.Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldState.error?.message}
                      </Form.Control.Feedback>
                    </div>
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldState.error?.message}
                      </Form.Control.Feedback>
                    </div>
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldState.error?.message}
                      </Form.Control.Feedback>
                    </div>
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <div>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldState.error?.message}
                      </Form.Control.Feedback>
                    </div>
                  )}
                />
              </Form.Group>
              <span className="disabled-cursor">
                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={!isValid}>
                  Daftar
                </Button>
              </span>
              <div className="text-center">
                <Link to={"/login"} className="d-block mb-2">
                  Sudah punya akun? Masuk
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export default NotAuth (RegisterPage);
export default RegisterPage
