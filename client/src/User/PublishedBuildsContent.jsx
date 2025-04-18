import React from "react";
import PublishedBuildCard from "../AtomicComponents/Cards/PublishedBuildCard";

export default function PublishedBuildsContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-4">
      <PublishedBuildCard
        image="https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg" // Replace with actual image URL
        buildName="Build Name"
        username="Username"
        userIcon="https://example.com/user-icon.jpg" // Replace with user icon URL
        description="Lorem Lorem ipsum dolor sit amet. Aut molestiae temporibus sit soluta suscipit..."
        score={1400}
      />
      <PublishedBuildCard
        image="https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg" // Replace with actual image URL
        buildName="Build Name"
        username="Username"
        userIcon="https://example.com/user-icon.jpg" // Replace with user icon URL
        description="Lorem Lorem ipsum dolor sit amet. Aut molestiae temporibus sit soluta suscipit..."
        score={1400}
      />
      <PublishedBuildCard
        image="https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg" // Replace with actual image URL
        buildName="Build Name"
        username="Username"
        userIcon="https://example.com/user-icon.jpg" // Replace with user icon URL
        description="Lorem Lorem ipsum dolor sit amet. Aut molestiae temporibus sit soluta suscipit..."
        score={1400}
      />
      <PublishedBuildCard
        image="https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg" // Replace with actual image URL
        buildName="Build Name"
        username="Username"
        userIcon="https://example.com/user-icon.jpg" // Replace with user icon URL
        description="Lorem Lorem ipsum dolor sit amet. Aut molestiae temporibus sit soluta suscipit..."
        score={1400}
      />
      <PublishedBuildCard
        image="https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg" // Replace with actual image URL
        buildName="Build Name"
        username="Username"
        userIcon="https://example.com/user-icon.jpg" // Replace with user icon URL
        description="Lorem Lorem ipsum dolor sit amet. Aut molestiae temporibus sit soluta suscipit..."
        score={1400}
      />
    </div>
  );
}
