import React from 'react';
import { Star } from 'lucide-react';
import { Heading } from './ui/Heading';
import { Paragraph } from './ui/Paragraph';

const testimonials = [
  {
    id: 1,
    name: 'Octavia McKenzie',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eVqu03oAK2UmvYsBjrOcHxMYLa5GJGbDCA&s',
    review: "I'm incredibly impressed with Hotovi! Found a skilled electrician within minutes, and the whole process was seamless. The platform made it so easy to connect with qualified professionals. Definitely my go-to for all home services now!",
    rating: 5
  },
  {
    id: 2,
    name: 'Kateryna Rudich',
    image: 'https://scontent.fbts5-1.fna.fbcdn.net/v/t39.30808-1/396970611_334025995944322_1289915055790493047_n.jpg?stp=c0.6.180.180a_dst-jpg_s180x180&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=12kGcwGI-mQQ7kNvgGbP_pc&_nc_zt=24&_nc_ht=scontent.fbts5-1.fna&_nc_gid=AoxS7Hgap61EImrETPXneqX&oh=00_AYBMEvPeqN_fnzzlKFFtwzgu8Nc2Y1i0l9IZAnH6SsYDzg&oe=674EAA2F',
    review: "As a newcomer to Slovakia, Hotovi has been invaluable in helping me find reliable service providers. The language options and clear communication made everything so much easier.",
    rating: 5
  },
  {
    id: 3,
    name: 'Dmitro Shevchenko',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
    review: "The quality of professionals on Hotovi is outstanding. I needed urgent plumbing work, and within an hour, I had a skilled plumber at my door. Exceptional service!",
    rating: 5
  },
  {
    id: 4,
    name: 'Olena Petrenko',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    review: "What sets Hotovi apart is how easy it is to find professionals who speak your language. As a Ukrainian speaker, this was incredibly important to me. Great platform!",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <div id="testimonials" className="bg-white dark:bg-gray-900 py-16 transition-colors">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Heading level={2} className="mb-4">
            Testimonials
          </Heading>
          <Paragraph>
            Real experiences from people who found the perfect service provider through Hotovi
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#ff5722] text-[#ff5722]"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Paragraph className="text-sm italic">
                "{testimonial.review}"
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};