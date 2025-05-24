
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/container";
import ContactForm from "@/components/contact-form";
import MotionDiv from "@/components/motion-div";
import Heading from "@/components/heading";

export default function ContactPage() {
  const ContactItem = [
    {name: "Email", value: "contact@sanjid.in", icon: <Mail />},
    {name: "Phone", value: "Available on Request", icon: <Phone />},
    {name: "Location", value: "Kerala, India", icon: <MapPin />},
  ]

  return (    
    <Container>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="px-4 md:px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
            >
              <Heading>Get in Touch</Heading>
              <p className="max-w-[700px] text-neutral-500 dark:text-neutral-400 md:text-xl">
                Have a project in mind? Let's discuss how we can help bring your
                vision to life.
              </p>
            </MotionDiv>

            <div className="grid gap-8 md:grid-cols-2">
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Feel free to reach out through any of these channels.
                  </p>
                </div>

                <div className="space-y-4">
                  {ContactItem.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-3 group-hover:translate-x-2 transition-transform duration-200 ease-in-out">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                      <p className="text-neutral-500 group-hover:text-primary transition-colors duration-200 ease-in-out">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  ))}
                </div>

                <div className="pt-6">
                  <h3 className="mb-4 font-medium">Follow Us</h3>
                  {/* <SocialShare /> */}
                </div>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-[28px] border bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <ContactForm />
              </MotionDiv>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
