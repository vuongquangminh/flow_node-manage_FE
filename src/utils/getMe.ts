import { setLocalStorage } from "../hooks/localStorage";
import { useLazyGetMeQuery } from "../store/services/UserService";


const useGetMe = () => {
  const [trigger] = useLazyGetMeQuery();

  // Trả về một hàm để gọi khi cần
  const getMe = async () => {
    try {
      const response = await trigger().unwrap();
      setLocalStorage({ key: "user", value: response });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return getMe;
};

export default useGetMe;
