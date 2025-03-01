"use client";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import supabase from "../Supabaseclient";


export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
  
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    // Show confirmation dialog
    const confirmSignOut = window.confirm("Are you sure you want to resign? You won't receive any emails from AI Musk.");
    if (confirmSignOut) {
      signOut();
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Update send_email to false before signing out
      await supabase
        .from('users')
        .update({ send_email: false })
        .eq('email', user.email);

      // Sign out the user
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveUserToDatabase = async (user) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          email: user.email,
          send_email: true,
        }, {
          onConflict: ['email']
        });
      if (error) throw error;
      console.log('User signed in, send_email set to true:', data);
    } catch (error) {
      console.error('Error saving user to database:', error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await saveUserToDatabase(user);
      }
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        saveUserToDatabase(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-blue-50 drop-shadow-lg">
          What did you do last week?
        </h1>
        <p className="text-md md:text-lg text-gray-400 mt-2 font-mono">
          AI Musk will email you on Sunday. Respond by Monday 11:59 PM PST.
        </p>

        {!user ? (
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="mt-8 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl w-full border border-blue-900/30 shadow-lg shadow-blue-900/10 hover:bg-blue-900/50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FcGoogle className="w-5 h-5" />
            <span>{loading ? 'Locking in...' : 'Sign in with Google'}</span>
        </button>
        ) : (
          <div className="mt-8">
            {/* Note: I kept your original layout but only showing the button as per your example */}
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="mt-4 bg-red-950/50 text-red-100 backdrop-blur-sm p-2 rounded-xl w-full max-w-md border border-red-700/50 shadow-lg shadow-red-900/10 hover:bg-red-900/70 transition-colors disabled:opacity-50"
            >
              {loading ? 'Resigning...' : 'Resign'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}