import { memo } from "react";

const SponsoredJobsBanner = () => {
  return (
    <section
      className="flex flex-col items-start container cursor-pointer mx-auto gap-5 justify-center my-16 px-6"
      aria-labelledby="sponsored-jobs-heading"
    >
      <h2 id="sponsored-jobs-heading" className="text-2xl capitalize font-bold">
        Sponsored Jobs
      </h2>
      
      <article 
        className="w-full container mx-auto rounded-2xl overflow-hidden shadow-lg"
        aria-label="Sponsored job opportunities banner"
      >
        <img
          src="/job.PNG"
          alt="Sponsored job opportunities - Find your next career opportunity"
          className="w-full h-auto object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width="1200"
          height="400"
        />
      </article>
    </section>
  );
};

export default memo(SponsoredJobsBanner);
