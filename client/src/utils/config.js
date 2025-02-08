const backendUri = import.meta.env.MODE === 'development' 
  ? import.meta.env.VITE_BACKEND_URI_DEV 
  : 'https://propella-backend.vercel.app';

export default backendUri;
