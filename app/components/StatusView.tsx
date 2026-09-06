// type StatusProps = {
//   status: string;
//   icon?: React.ReactNode;
//   text?: string;
//   grey?: string;
//   red?: string;
//   orange?: string;
//   yellow?: string;
//   blue?: string;
//   black?: string;
//   teal?: string;
//   redPlain?: string;
//   greenPlain?: string;
//   orangePlain?: string;
//   green?: string;
//   styleOption?: boolean;
//   disable?: boolean;
//   classText?: string;
//   classStyleName?: string;
//   purple?: string;
// };

// const colors = {
//   grey: "bg-[#535353]",
//   orange: "bg-[#E4B3041A] ",
//   yellow: "bg-[#F7B801]",
//   red: "bg-[#E81E1E]",
//   blue: " bg-[#175AB5]",
//   teal: "bg-[#E0F8F6]",
//   redPlain: "",
//   green: "bg-[#0EB26B]",
//   greenPlain: "",
//   orangePlain: "",
//   black: "bg-black",
//   purple: "bg-[#8A38F51A]",
// };
// // const colors = {
// //   grey: "text-gray-600 bg-[#EFF1F3]",
// //   orange: "text-[#E4B304] bg-[#E4B3041A] ",
// //   red: "text-[#E63946] bg-[#E639461A]",
// //   blue: "text-[#205FBE] bg-[#E2EEFF]",
// //   teal: "text-[#00B2A9] bg-[#E0F8F6]",
// //   redPlain: "text-[#F24236]",
// //   green: "text-[#00AC47] bg-[#0EB26B]",
// //   greenPlain: "text-[#16A34A] ",
// //   orangePlain: "text-[#D97706]",
// //   black: "text-white bg-blavk",
// //   purple: "text-[#8A38F5] bg-[#8A38F51A]",
// // };
// const StatusView = ({
//   status,
//   icon,
//   classText,
//   grey,
//   orange,
//   yellow,
//   red,
//   blue,
//   teal,
//   green,
//   black,
//   greenPlain,
//   redPlain,
//   orangePlain,
//   purple,
//   styleOption = false,
//   disable = false,
//   classStyleName = "leading-[13px] flex justify-center items-center rounded-[7px] py-1 px-4 text-white",
// }: StatusProps) => {
//   let colorString: string;
//   switch (status) {
//     case `${red}`:
//       colorString = colors.red;
//       break;
//     case `${grey}`:
//       colorString = colors.grey;
//       break;
//     case `${orange}`:
//       colorString = colors.orange;
//       break;
//     case `${yellow}`:
//       colorString = colors.yellow;
//       break;
//     case `${blue}`:
//       colorString = colors.blue;
//       break;
//     case `${teal}`:
//       colorString = colors.teal;
//       break;
//     case `${green}`:
//       colorString = colors.green;
//       break;
//     case `${redPlain}`:
//       colorString = colors.redPlain;
//       break;
//     case `${greenPlain}`:
//       colorString = colors.greenPlain;
//       break;
//     case `${orangePlain}`:
//       colorString = colors.orangePlain;
//       break;
//     case `${black}`:
//       colorString = colors.black;
//       break;
//     case `${purple}`:
//       colorString = colors.purple;
//       break;
//     default:
//       colorString = "";
//   }
//   return (
//     <div
//       className={`flex ${styleOption ? "" : "justify-center"} ${
//         disable ? "opacity-30" : "opacity-100"
//       }`}
//     >
//       <div
//         className={`text-[clamp(10px,1.2vw,14px)] text-white font-medium ${classStyleName} ${colorString} ${classText}`}
//       >
//         <span>{icon}</span>
//         {status}
//       </div>
//     </div>
//   );
// };

// export default StatusView;

type StatusProps = {
  status: string;
  icon?: React.ReactNode;
  classText?: string;
  classStyleName?: string;
  styleOption?: boolean;
  disable?: boolean;
  variant?: "solid" | "soft"; // NEW — controls which treatment + color map is used
  grey?: string;
  red?: string;
  orange?: string;
  yellow?: string;
  blue?: string;
  green?: string;
  purple?: string;
  pink?: string;
};

// Existing solid+white treatment — unchanged, still used by every current call site
const solidColors = {
  grey: "bg-[#535353]",
  orange: "bg-[#E4B3041A]",
  yellow: "bg-[#F7B801]",
  red: "bg-[#E81E1E]",
  blue: "bg-[#175AB5]",
  green: "bg-[#0EB26B]",
  purple: "bg-[#8A38F51A]",
  pink: "bg-[#E4199D]",
};

// New soft/tinted treatment — bg + matching text color, no white
const softColors = {
  grey: "bg-[#5353531A] text-[#535353]",
  yellow: "bg-[#E59C1521] text-[#E59C15]",
  red: "bg-[#F54F5221] text-[#F54F52]",
  blue: "bg-[#1C88BE21] text-[#1C88BE]",
  green: "bg-[#0EB26B21] text-[#0EB26B]",
  purple: "bg-[#881CBE21] text-[#881CBE]",
  orange: "bg-[#E4B3041A] text-[#E4B304]",
  pink: "bg-[#E4199D21 text-[#E4199D]",
};

const StatusView = ({
  status,
  icon,
  classText,
  grey,
  orange,
  yellow,
  red,
  blue,
  green,
  purple,
  pink,
  styleOption = false,
  disable = false,
  variant = "solid", // defaults to old behavior — nothing breaks
  classStyleName,
}: StatusProps) => {
  const colors = variant === "soft" ? softColors : solidColors;

  let colorString = "";
  switch (status) {
    case grey:
      colorString = colors.grey;
      break;
    case orange:
      colorString = colors.orange;
      break;
    case yellow:
      colorString = colors.yellow;
      break;
    case red:
      colorString = colors.red;
      break;
    case blue:
      colorString = colors.blue;
      break;
    case green:
      colorString = colors.green;
      break;
    case purple:
      colorString = colors.purple;
      break;
    case pink:
      colorString = colors.pink;
      break;
    default:
      colorString = "";
  }

  // Solid variant keeps forcing white text (old default behavior).
  // Soft variant must NOT force white — the color comes from the map itself.
  const defaultStyleName =
    variant === "soft"
      ? "leading-[13px] flex justify-start items-center rounded-[6px] py-2 px-3 text-[clamp(12px,1.1vw,13px)] font-semibold"
      : "leading-[13px] flex justify-center items-center rounded-[7px] py-1 px-4 text-white";

  return (
    <div
      className={`flex ${styleOption ? "" : "justify-center"} ${
        disable ? "opacity-30" : "opacity-100"
      }`}
    >
      <div
        className={`text-[clamp(10px,1.2vw,14px)] font-medium ${
          classStyleName ?? defaultStyleName
        } ${colorString} ${classText ?? ""}`}
      >
        <span>{icon}</span>
        {status}
      </div>
    </div>
  );
};

export default StatusView;
