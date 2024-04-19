import { message } from "antd";
import { FormEvent, FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/UserService/userService";

const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegisterUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await userService.createUser(formData);
      navigate('/login');
    } catch (error) {
      message.error('Erro ao registrar o usuário. Por favor, tente novamente.');
    }
  }

  return (
    <div className='grid grid-cols-2 bg-gray-50 p-32'>
      <div className=''>
        <main className='flex flex-col gap-10 w-full max-w-[384px]'>
          <header className='flex flex-col gap-1 w-full ma-w-[350px]'>
            <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 text-center'>
              Não tem conta?
            </h1>
            <p className='text-gray-600 text-center'>
              Registre-se aqui
            </p>
          </header>
          <form className='flex flex-col gap-4' onSubmit={handleRegisterUser}>
            <div className='flex flex-col gap-2'>
              <label
                className='font-sans font-semibold text-sm text-gray-700'
                htmlFor="username">
                Nome de usuário
              </label>
              <input
                className='text-sm p-2 rounded-lg border border-gray-200 hover:border-green-300 outline-none focus:border-green-400'
                type="text"
                id='username'
                name='username'
                placeholder='Digite seu nome de usuário'
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='font-sans font-semibold text-sm text-gray-700'
                htmlFor="email">
                E-mail
              </label>
              <input
                className='text-sm p-2 rounded-lg border border-gray-200 hover:border-green-300 outline-none focus:border-green-400'
                type="email"
                id='email'
                name='email'
                placeholder='Digite seu e-mail'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='flex justify-between font-sans font-semibold text-sm text-gray-700'
                htmlFor="password">
                Senha
              </label>
              <input
                className='text-sm p-2 rounded-lg border border-gray-200 hover:border-green-300 outline-none focus:border-green-400'
                type="password"
                id='password'
                name='password'
                placeholder='Digite sua senha'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              type='submit'
              className='bg-green-600 text-white  py-2 rounded outline-none hover:bg-green-500 hover:ring-1 hover:ring-green-400 focus:ring-2 focus:ring-green-300 px-4'>
              Registrar
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Register;
