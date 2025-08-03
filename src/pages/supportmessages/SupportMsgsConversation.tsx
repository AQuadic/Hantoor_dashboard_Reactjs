import { useTranslation } from "react-i18next";
import Avatar from "/images/avatar.svg";

const SupportMsgsConversation = () => {
    const { t } = useTranslation("header");
    const messages = [
        {
        id: 1,
        name: "مصطفى محمود",
        time: "3:02PM",
        text: "لوريم إيبسوم طريقة كتابة النصوص في النشر والتصميم الجرافيك",
        isSender: true,
        },
        {
        id: 2,
        name: "مصطفى محمود",
        time: "3:02PM",
        text: "لوريم إيبسوم طريقة كتابة النصوص في النشر والتصميم الجرافيك",
        isSender: false,
        },
        {
        id: 3,
        name: "مصطفى محمود",
        time: "3:02PM",
        text: "لوريم إيبسوم طريقة كتابة النصوص في النشر والتصميم الجرافيك",
        isSender: true,
        },
        {
        id: 4,
        name: "مصطفى محمود",
        time: "3:02PM",
        text: "لوريم إيبسوم طريقة كتابة النصوص في النشر والتصميم الجرافيك",
        isSender: false,
        },
    ];

    return (
        <section className="py-4 px-4 max-w-2xl mx-auto">
        <h2 className="text-[#071739] text-[23px] font-bold text-center">{t('conversation')}</h2>
        <hr className="my-4"/>
        <div className="space-y-6">
            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`flex ${msg.isSender ? "justify-start" : "justify-end"}`}
            >
                {msg.isSender && (
                <div className="w-10 h-10 ml-2 flex-shrink-0">
                    <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                </div>
                )}

                <div>
                {msg.isSender && (
                    <div className="text-sm text-[#231F20] mb-1 text-right">{msg.name}</div>
                )}

                <div
                    className={`rounded-xl px-4 py-2 max-w-xs text-sm ${
                    msg.isSender
                        ? "bg-blue-600 text-white"
                        : "bg-[#F1F1F1] text-[#000000]"
                    }`}
                >
                    {msg.text}
                </div>

                <div className="text-[10px] text-gray-500 mt-1 text-right">{msg.time}</div>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default SupportMsgsConversation;
