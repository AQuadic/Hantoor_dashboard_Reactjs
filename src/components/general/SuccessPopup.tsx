import React from "react";
import success from '/images/success.svg'

interface SuccessPopupProps {
    onClose: () => void;
}

const SuccessPopup = ({ onClose }: SuccessPopupProps) => {
    const handleInnerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

return (
    <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
    onClick={onClose}
    >
    <div
        onClick={handleInnerClick}
        className="bg-white rounded-xl p-6 text-center shadow-2xl w-[320px]"
    >
        <div className="flex items-center justify-center">
            <img src={success} alt="success icon" />
        </div>
        <p className="text-2xl font-bold text-[#141513] mt-3">تم الارسال بنجاح</p>
        <button
        onClick={onClose}
        className="mt-6 w-full py-2 bg-[#202A81] text-white rounded-lg hover:bg-[#162062]"
        >
        اغلاق
        </button>
    </div>
    </div>
);
};

export default SuccessPopup;
