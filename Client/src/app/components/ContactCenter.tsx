import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import { contactOptions } from '@/lib/data.tsx';



function ContactCenter() {
  return (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Contact options</h2>
            <p className="text-muted-foreground">
              Our support team is here for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactOptions.map((option, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mb-4`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{option.availability}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
  )
}

export default ContactCenter