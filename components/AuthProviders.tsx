"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

//create a type for Provider, the name and field is based on the next-auth documentation
type Provider = {
    id: string,
    name: string,
    type: string,
    signinUrl: string,
    callbackUrl: string,
    signinUrlParams?: Record<string, string> | undefined,
}

//create a type for Providers
type Providers = Record<string, Provider>;

const AuthProviders = () => {

    const [providers, setProviders] = useState<Providers | null>(null);

    //we will need to fetch the providers on the start
    useEffect(() => {
        const fetchProviders = async () => {
            //use the getProviders() from the "next-auth/react"
            const response = await getProviders();

            setProviders(response);
        }
        fetchProviders();
    }, []);

    if (providers) {
        return (
            <div>
                {/* take the values of the providers, and map through them to get each of the individual provider */}
                {/* the provider will have a type -> Provider, and we also get the index of the provider */}
                {Object.values(providers).map((provider: Provider, i) => (
                    <button key={i} onClick={() => signIn(provider?.id)}>
                        {provider.id}
                    </button>
                ))}
            </div>
        )
    }
}

export default AuthProviders