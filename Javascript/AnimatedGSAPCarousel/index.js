var tl = gsap.timeline({ repeat: -1 });

tl.to(
  document.querySelectorAll(".imageContainer > img"),
  {
    width: "100%",
    stagger: 3,
    ease: Expo.easeInOut,
  },
  "a"
)
  .to(
    document.querySelectorAll(".caption h1"),
    {
      top: 0,
      stagger: 3,
      ease: Expo.easeInOut,
    },
    "a"
  )
  .to(
    document.querySelectorAll(".caption h1"),
    {
      top: "-100%",
      delay: 3,
      stagger: 3,
      ease: Expo.easeInOut,
    },
    "a"
  );
