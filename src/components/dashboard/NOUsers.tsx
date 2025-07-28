import React from 'react';

const NOUsers = () => {
    const data = [
        { label: 'السعودية', value: 130, color: '#2A32F8', percentage: 18.6 },
        { label: 'مصر', value: 120, color: '#FEA54D', percentage: 17.2 },
        { label: 'الإمارات', value: 230, color: '#37BF40', percentage: 32.9 },
        { label: 'الكويت', value: 73, color: '#47BDF8', percentage: 10.5 },
        { label: 'قطر', value: 90, color: '#8948E6', percentage: 12.9 },
        { label: 'البحرين', value: 55, color: '#BE2E8E', percentage: 7.9 }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    };

    const createPieSlice = (startAngle, endAngle, innerRadius, outerRadius) => {
        const start = polarToCartesian(0, 0, outerRadius, endAngle);
        const end = polarToCartesian(0, 0, outerRadius, startAngle);
        const innerStart = polarToCartesian(0, 0, innerRadius, endAngle);
        const innerEnd = polarToCartesian(0, 0, innerRadius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
            "L", innerEnd.x, innerEnd.y,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
            "Z"
        ].join(" ");
    };

    let currentAngle = 0;
    const gap = 4;

    const segments = data.map((item) => {
        const angle = (item.value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle - gap;
        currentAngle += angle;

        return {
            ...item,
            path: createPieSlice(startAngle, endAngle, 60, 100),
            startAngle,
            endAngle
        };
    });

    return (
        <section className='w-[251px] h-full bg-[#FFFFFF] rounded-[15px] mt-[15px] p-6'>
            <h2 className='text-[#000000] text-[23px] font-bold mb-4'>عدد المستخدمين</h2>

            <div className="flex justify-center mb-8">
                <div className="relative">
                    <svg width="200" height="200" viewBox="-100 -100 200 200" className="transform rotate-0">
                        {segments.map((segment, index) => (
                            <path
                                key={index}
                                d={segment.path}
                                fill={segment.color}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        ))}
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">698</div>
                            <div className="text-sm text-[#2A32F8] font-medium">+25%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4" style={{ direction: 'rtl' }}>
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-2">
                        <div>
                            <div
                                className="w-[9px] h-[23px] rounded-sm"
                                style={{ backgroundColor: item.color }}
                            ></div>
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                            <span className="text-xs font-normal text-[#808080]">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NOUsers
