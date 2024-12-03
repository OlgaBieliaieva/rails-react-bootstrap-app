import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const Testimonials = () => {
  return (
    <section className="w-100 container container-fluid text-center">
      <div className=" w-100 container py-5">
        <h2 className="display-4">Testimonials</h2>
        <p className="lead text-muted">What our customers say</p>

        <div className="w-100 text-start">
          <RiDoubleQuotesL style={{ width: "3em", height: "3em" }} />
        </div>
        <figure className="mb-0">
          <blockquote className="blockquote">
            Recipes has transformed my cooking experience! With its diverse
            recipe collection and user-friendly interface, I can easily find,
            save, and cook delicious meals for any occasion. From quick dinners
            to elaborate feasts, this app has become my go-to kitchen companion.
            Highly recommended!
          </blockquote>
          <figcaption className="blockquote-footer mt-0">Harriet Rojas</figcaption>
        </figure>
        <div className="w-100 text-end">
          <RiDoubleQuotesR style={{ width: "3em", height: "3em" }} />
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
