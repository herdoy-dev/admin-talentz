import { Flex } from "@radix-ui/themes";

const Or = () => {
  return (
    <Flex align="center" justify="between" gap="3">
      <div className="h-[2px] flex-1 bg-gray-200" />
      <p>or</p>
      <div className="h-[2px] flex-1 bg-gray-200" />
    </Flex>
  );
};

export default Or;
