const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="relative w-5 h-5">
                <div className="absolute border-4 border-solid border-emerald-600 border-t-transparent rounded-full w-full h-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Spinner;
