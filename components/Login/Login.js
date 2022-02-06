import React from "react";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const AUTENTICACION_USUARIO = gql`
  mutation Mutation($content: Login) {
    loginUsuario(content: $content) {
      token
    }
  }
`;

const Login = () => {
  const [loginUsuario] = useMutation(AUTENTICACION_USUARIO);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      usuario: "",
      contraseña: "",
    },

    validationSchema: Yup.object({
      usuario: Yup.string().required("Requerido"),
      contraseña: Yup.string()
        .min(4, "Mínimo 4 caracteres")
        .required("Requerido"),
    }),

    onSubmit: async (values) => {
      const { usuario, contraseña } = values;

      try {
        const { data } = await loginUsuario({
          variables: {
            content: {
              nombre: usuario,
              password: contraseña,
            },
          },
        });

        const { token } = data.loginUsuario;

        localStorage.setItem("token", token);

        router.push("/usuarios");
      } catch (error) {
        return error.message;
      }
    },
  });

  return (
    <div>
      <div>
        <h2>Inicio de sesión</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <TextField
              label="Usuario"
              name="usuario"
              onChange={formik.handleChange}
              value={formik.values.usuario}
            />
          </FormControl>

          <FormControl>
            <TextField
              name="contraseña"
              label="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.contraseña}
            />
          </FormControl>

          <Button variant="outlined" type="submit">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
