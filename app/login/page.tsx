import { Box, Flex, Heading } from "@radix-ui/themes";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      py="8"
      gap="6"
      px="3"
    >
      <Box
        px="5"
        py="4"
        className="border shadow-lg rounded-2xl w-full md:max-w-[450px]"
      >
        <Heading as="h1" align="center" mb="4" size="7">
          Login
        </Heading>
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default Login;
