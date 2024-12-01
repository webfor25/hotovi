import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { Heading } from '../components/ui/Heading';
import { Paragraph } from '../components/ui/Paragraph';
import { useAuthContext } from '../context/AuthContext';
import { signInSchema } from '../lib/validators/auth';
import toast from 'react-hot-toast';

const SignIn = () => {
  const { signIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const validatedData = signInSchema.parse(data);
      await signIn(validatedData);
      toast.success('Signed in successfully');
      window.location.hash = '';
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to sign in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <Heading level={1} className="mb-4 text-[1.5rem]">Sign in to your account</Heading>
          <Paragraph className="mt-4">
            Don't have an account?{' '}
            <a href="#signup" className="text-[#ff5722] hover:text-[#f4511e] ml-4">
              Sign up here
            </a>
          </Paragraph>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a 
                  href="#forgot-password" 
                  className="text-sm text-[#ff5722] hover:text-[#f4511e]"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff5722] hover:bg-[#f4511e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5722] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <User className="h-5 w-5 mr-2" />
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <a
                href="#signup"
                className="w-full flex justify-center items-center py-2 px-4 border border-[#ff5722] rounded-md text-sm font-medium text-[#ff5722] bg-transparent hover:bg-[#ff57220a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5722] transition-colors"
              >
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;