class CreateTestimonials < ActiveRecord::Migration[8.0]
  def change
    create_table :testimonials do |t|
      t.text :testimonial
      t.timestamps
    end
  end
end
