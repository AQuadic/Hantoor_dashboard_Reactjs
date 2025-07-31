import React, { useState } from "react";
import { Checkbox, DatePicker, Input } from "@heroui/react";
import DatePickerIcon from "@/components/icons/general/DatePickerIcon";
import { getLocalTimeZone, today } from "@internationalized/date";

const CarPrices = () => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shouldDiscount, setShouldDiscount] = useState<boolean>(false);
  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <h1 className="text-lg text-primary font-bold mb-2">سعر السيارة </h1>
      <div className="flex gap-4 ">
        <Input
          value={price.toString()}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          label="السعر"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          className="w-1/4"
        />
        <div className="bg-[#2E7CBE1A] w-1/4 px-5 py-4 flex items-center justify-between rounded-2xl">
          <span> السعر بالدرهم الاماراتي</span>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
      </div>
      <Checkbox
        isSelected={shouldDiscount}
        onValueChange={(value) => setShouldDiscount(value)}
        className="text-[#606060] my-3"
      >
        يوجد خصم على السعر
      </Checkbox>
        <div className="flex gap-4 ">
        <Input
          value={price.toString()}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          label="نسبة الخصم"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          className="w-1/4"
        />
         <Input
          type="date"
          label="التاريخ"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          className="w-1/4"
        />
        <div className="bg-[#2E7CBE1A] w-1/4 px-5 py-4 flex items-center justify-between rounded-2xl">
          <span>السعر بعد الخصم</span>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
      </div>
      {shouldDiscount && (
        <div className="flex items-center gap-4">
          <Input
            max={100}
            value={discount.toString()}
            onChange={(e) => setDiscount(Number(e.target.value))}
            type="number"
            label="نسبة الخصم"
            variant="bordered"
            placeholder="اكتب هنا"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            className="w-1/4"
          />
          <DatePicker
            size="lg"
            variant={"bordered"}
            className="w-1/4"
            label="التاريخ"
            maxValue={today(getLocalTimeZone())}
            selectorIcon={<DatePickerIcon />}
          />
          <div className="bg-[#2E7CBE1A] w-1/4 px-5 py-4 flex items-center justify-between rounded-2xl">
            <span>السعر بعد الخصم</span>
            <span className="text-xl font-bold text-primary">
              {price - (price * discount) / 100}
            </span>
          </div>
        </div>
      )}
      <div className="mt-4  w-[calc(50%+16px)] h-[46px] border border-[#DBDEE1] rounded-[34px] flex items-center px-4 gap-16">
        <Checkbox defaultSelected size="md">
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            شامل الضرائب
          </p>
        </Checkbox>{" "}
        <Checkbox defaultSelected size="md">
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            شامل الضمان{" "}
          </p>
        </Checkbox>{" "}
        <Checkbox defaultSelected size="md">
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            شامل التأمين{" "}
          </p>
        </Checkbox>
      </div>
    </div>
  );
};

export default CarPrices;
