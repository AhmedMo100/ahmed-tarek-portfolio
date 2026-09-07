import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const nextConfig: NextConfig = {

    images: {

        remotePatterns: [

            // Cloudinary
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },


            // Postimages
            {
                protocol: "https",
                hostname: "i.postimg.cc",
                pathname: "/**",
            },

        ],

    },

};


const withNextIntl =
    createNextIntlPlugin();


export default withNextIntl(nextConfig);