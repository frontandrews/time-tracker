'use client'
/* eslint-disable react/display-name */
import React from "react";
import { useRouter } from "next/router";

function IsAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    // const { data, loading, error } = useMeQuery();

    const data = [{ data: 1 }];
    const loading = false;
    const error = false;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const router = useRouter();

    if (loading) {
      return <div>Loading...</div>;
    }

    // if (error || !data) {
    //   router.push("/login");
    // }

    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}

export default IsAuth;
