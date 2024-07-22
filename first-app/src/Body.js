import React from 'react';

const Body = ({ children }) => {
    return (
        <div className="bg-gray-200 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg">
            <div className=" mx-auto max-w-3xl">
                <div className="slot-content p-60">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Body;