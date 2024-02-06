import { Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './globalStyle.css';
import {
    CreatePost,
    EditProfile,
    Explore,
    Home,
    PostDetail,
    EditPost,
    Profile,
    Saved,
    Search,
    Social,
} from './_root/pages';
import { SignInForm, SignUpForm, Toaster } from '../src/components';
import AuthLayout from '../src/_auth/AuthLayout';
import RootLayout from '../src/_root/RootLayout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider, ToastProvider } from './context';
import { useThemeContext } from './context/ThemeContext';

export default function App() {
    const { theme } = useThemeContext();

    return (
        <div className={theme + ' max-container'}>
            <main
                className="min-h-screen
          dark:bg-dark-bg bg-light-bg
          dark:text-white-text"
            >
                <AuthProvider>
                    <ToastProvider>
                        <Routes>
                            {/* AUTH LAYOUT */}
                            <Route element={<AuthLayout />}>
                                <Route
                                    path="/sign-in"
                                    element={<SignInForm />}
                                />
                                <Route
                                    path="/sign-up"
                                    element={<SignUpForm />}
                                />
                            </Route>
                            {/* ROOT LAYOUT */}
                            <Route element={<RootLayout />}>
                                <Route index element={<Home />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/explore" element={<Explore />} />
                                <Route path="/saved" element={<Saved />} />
                                <Route path="/social" element={<Social />} />
                                <Route
                                    path="/create-post"
                                    element={<CreatePost />}
                                />
                                <Route
                                    path="/profile/:id"
                                    element={<Profile />}
                                />
                                <Route
                                    path="/edit-post/:id"
                                    element={<EditPost />}
                                />

                                <Route
                                    path="/edit-profile/:id"
                                    element={<EditProfile />}
                                />
                            </Route>
                            <Route
                                path="/post-detail/:id"
                                element={<PostDetail />}
                            />
                        </Routes>
                        <Toaster />
                    </ToastProvider>
                </AuthProvider>
            </main>
        </div>
    );
}
