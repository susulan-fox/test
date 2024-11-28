import { useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { axiosInstance } from "../../lib/axios";
import { login } from "../../store/actions/authActions";
import { jwtDecode } from "jwt-decode";
import { zodResolver } from "@hookform/resolvers/zod";
// import { NotAuth } from "../../hoc/checkAuth";  (Saya gunakan HOC Auth selalu unexpected token < )

const LoginPage = () => {
  const navigate = useNavigate(); // Tambahkan ini
  const validateForm = z.object({
    username: z.string().min(5, "Username must be at least 5 characters"),
    password: z.string().min(5, "Password must be at least 5 characters"),
  });

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
    mode: "onChange",
  });

  const LoginUser = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const token = response.data.data.token;
      const decoded = jwtDecode(token);
      const combined = { ...decoded, token };

      if (response.data.status.code === 201) {
        toast.success("Login Success");

        // Simpan data di Redux Store
        dispatch(login(combined));

        // Redirect ke halaman dashboard-customers setelah login
        navigate("/dashboard-customers");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      if (error?.response?.data?.status) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Server error");
      }
      console.log(error.response);
    }
  };

  useEffect(() => {
    toast.info("Akun Demo Role Admin, Username: admin, Password: password");
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vw-100 vh-100 bg-light login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="login-form-container">
            <div className="text-center mb-4">
              <h2>Masuk Dashboard</h2>
            </div>
            <Form onSubmit={handleSubmit(LoginUser)}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field, fieldState }) => {
                    return (
                      <div>
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter username"
                          isInvalid={Boolean(fieldState.error)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error && fieldState.error.message}
                        </Form.Control.Feedback>
                      </div>
                    );
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kata Sandi</Form.Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => {
                    return (
                      <div>
                        <Form.Control
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          isInvalid={Boolean(fieldState.error)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error && fieldState.error.message}
                        </Form.Control.Feedback>
                      </div>
                    );
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={!isValid}
              >
                Masuk
              </Button>

              <div className="text-center">
                <a href="#" className="d-block mb-2">
                  Lupa kata sandi?
                </a>
                <Link to={"/register"} className="d-block">
                  Belum punya akun? Daftar
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export default IsAuth(LoginPage);
export default  LoginPage;
