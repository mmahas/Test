// import { Login } from '../page-components/Auth/login';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const history = useRouter();

  useEffect(() => {
    void history.push('/login');
  }, []);
};
export default Index;
