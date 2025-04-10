import React from "react";
import PCBuildCard from "../../AtomicComponents/Cards/PCBuildCard";

export default function CustomBuildsContent() {
  const pcBuild = {
    image:
      "https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg", // Replace with a real image URL
    name: "PC Build 1",
    score: 1400,
    specs: [
      ["OS", "Windows 11 Home"],
      ["Processor", "Intel® Core™ i9-14900KF CPU"],
      ["Motherboard", "ASUS Z790 Gaming WiFi 7"],
      ["Memory", "32GB DDR5-600MHz RGB RAM"],
      ["Graphics", "GeForce RTX 4070 Ti SUPER - 16GB"],
      ["Storage", "2TB M.2 NVMe Gen4 SSD"],
    ],
  };
  return (
    <div>
      <PCBuildCard
        image={pcBuild.image}
        name={pcBuild.name}
        score={pcBuild.score}
        specs={pcBuild.specs}
      />
      <PCBuildCard
        image={pcBuild.image}
        name={pcBuild.name}
        score={pcBuild.score}
        specs={pcBuild.specs}
      />
      <PCBuildCard
        image={pcBuild.image}
        name={pcBuild.name}
        score={pcBuild.score}
        specs={pcBuild.specs}
      />
    </div>
  );
}
