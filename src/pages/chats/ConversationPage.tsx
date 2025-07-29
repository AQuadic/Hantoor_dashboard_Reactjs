import ActiveStatus from "@/components/icons/general/ActiveStatus";
import Avatar from "/images/avatar.svg";
import Delete from "@/components/icons/general/Delete";
import carImage from '/images/carImage.png'
const ConversationPage = () => {
    const messages = [
        {
        id: 1,
        name: "Mohmed Ahmed",
        time: "3:00PM",
        text: "يا جماعة حد جرب تويوتا كورولا 2022؟ بفكر أجيبها بس محتار بينها وبين الإلنترا. 🤚",
        },
        {
        id: 2,
        name: "Sara Youssef",
        time: "3:00PM",
        text: "أنا معايا تويوتا ياريس 2021، عربية عملية جدًا 👍وصيانتها رخيصة، بس الكورولا أكيد أعلى فئة. ✅",
        },
        {
        id: 3,
        name: "Mohmed Ahmed",
        time: "3:01PM",
        text: "بصراحة ممتازة في الثبات والبنزين 👍 ومفيهاش أعطال خالص. تويوتا دايمًا مضمونة. 🔝",
        },
        {
        id: 4,
        name: "Ahmed Khaled",
        time: "3:05PM",
        text: "بس خلى بالك من فرق السعر، الكورولا أغلى شوية من الإلنترا، بس فرق الاعتمادية واضح. ☝",
        },
    ];

    return (
        <section className="bg-white mx-auto p-4">
        <h2 className="text-[#071739] text-lg font-bold text-center mb-4">
            المحادثة
        </h2>

        <div className="flex flex-wrap items-center justify-between rounded-lg p-2 mb-4">
            <div className="flex items-center gap-3">
            <img
                src={carImage}
                alt="car"
                className="w-[104px] h-[71px] rounded-lg object-cover mr-2"
            />
            <div>
                <p className="text-[17px] font-bold">تويوتا كامري 2025</p>
                <p className="text-base text-[#000000]">تويوتا</p>
            </div>
            </div>
            <div className="flex items-center gap-[14px] md:mt-0 mt-4">
                <ActiveStatus />
                <Delete />
            </div>
        </div>

        <div className="space-y-4">
            {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2">
                {/* Avatar */}
                <img src={Avatar} alt="avatar" className="w-8 h-8 rounded-full" />

                {/* Name + Time + Bubble */}
                <div>
                <p className="text-xs font-medium text-[#071739]">{msg.name}</p>
                <p className="text-[10px] text-gray-400 mb-1">{msg.time}</p>

                <div className="bg-[#1C1C1E] text-white rounded-2xl px-3 py-2 max-w-xs text-sm">
                    {msg.text}
                </div>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default ConversationPage;
