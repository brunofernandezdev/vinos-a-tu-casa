"use client"

import { useState } from "react"
import { Wine, Phone, Mail, MessageCircle, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WineStore() {
  const [activeSection, setActiveSection] = useState("home")

  const promos = [
    {
      title: "Trumpeter Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Frutado, notas de ciruelas maduras, toques de chocolate y especias suaves",
      price: "$44.000",
      priceType: "Caja cerrada (Promo)",
      image: "/placeholder.svg?height=300&width=200&text=Trumpeter+Malbec",
    },
    {
      title: "Bedz Malbec Estate 2017",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Aromas de frutos rojos, toques de violetas, con un final suave y elegante",
      price: "$36.000",
      priceType: "Caja cerrada",
      alternativePrice: "$12.000 (2 unidades)",
      image: "/placeholder.svg?height=300&width=200&text=Bedz+Malbec+Estate",
    },
    {
      title: "Bedz Malbec Reserva 2015",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Complejo, con notas de frutas negras maduras, un toque de vainilla y un final especiado",
      price: "$54.000",
      priceType: "Caja cerrada",
      alternativePrice: "$18.000 (2 unidades)",
      image: "/placeholder.svg?height=300&width=200&text=Bedz+Reserva",
    },
    {
      title: "De Moño Rojo Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Aromas herbáceos, con notas de frutos rojos y especias suaves, taninos elegantes",
      price: "$59.000",
      priceType: "Caja cerrada",
      alternativePrice: "$20.000 (2 unidades)",
      image: "/placeholder.svg?height=300&width=200&text=De+Moño+Rojo",
    },
    {
      title: "Espumante Animal Extra Brut",
      varietal: "Blend (Chardonnay y Pinot Noir)",
      region: "Mendoza, Argentina",
      description: "Fresco, con burbujas finas, notas de manzana verde y toques de pan tostado",
      price: "$48.000",
      priceType: "Caja cerrada (Promo)",
      image: "/placeholder.svg?height=300&width=200&text=Animal+Extra+Brut",
    },
    {
      title: "Promo RESERVA",
      varietal: "Combinación libre",
      region: "Mendoza, Argentina",
      description: "Combina como quieras hasta completar 6 unidades",
      wines: [
        "Malabarista Reserva Cabernet Franc - $12.000/u",
        "Kaiken Obertura - $18.000/u",
        "Bedz Reserva Malbec 2015 - $9.000/u",
      ],
      priceType: "Precio por unidad según selección",
      image: "/placeholder.svg?height=300&width=200&text=Promo+Reserva",
    },
  ]

  const contactInfo = [
    {
      type: "WhatsApp",
      icon: MessageCircle,
      value: "+54 9 11 1234-5678",
      link: "https://wa.me/5491112345678",
      description: "Consultá disponibilidad y hacé tu pedido",
    },
    {
      type: "WhatsApp Ventas",
      icon: MessageCircle,
      value: "+54 9 11 8765-4321",
      link: "https://wa.me/5491187654321",
      description: "Asesoramiento personalizado",
    },
    {
      type: "Email",
      icon: Mail,
      value: "ventas@vinoteca.com",
      link: "mailto:ventas@vinoteca.com",
      description: "Consultas y pedidos por email",
    },
    {
      type: "Teléfono",
      icon: Phone,
      value: "(011) 4567-8900",
      link: "tel:+541145678900",
      description: "Atención telefónica Lun-Vie 9-18hs",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-amber-950">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-rose-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wine className="h-8 w-8 text-rose-400" />
              <h1 className="text-2xl font-bold text-white font-playfair">Vinos a tu casa</h1>
            </div>
            <nav className="flex space-x-6">
              <Button
                variant={activeSection === "home" ? "default" : "ghost"}
                onClick={() => setActiveSection("home")}
                className="text-white hover:text-rose-400 hover:bg-white/10 font-medium"
              >
                Inicio
              </Button>
              <Button
                variant={activeSection === "promos" ? "default" : "ghost"}
                onClick={() => setActiveSection("promos")}
                className="text-white hover:text-rose-400 hover:bg-white/10 font-medium"
              >
                Promos
              </Button>
              <Button
                variant={activeSection === "contacto" ? "default" : "ghost"}
                onClick={() => setActiveSection("contacto")}
                className="text-white hover:text-rose-400 hover:bg-white/10 font-medium"
              >
                Contacto
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Home Section */}
      {activeSection === "home" && (
        <main className="relative">
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/wine-pouring.jpg')`,
                filter: "brightness(0.7)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
              <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl font-playfair">
                Vinos a tu casa
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg font-light">
                Los mejores vinos seleccionados para tu mesa
              </p>
              <p className="text-lg mb-12 text-gray-100 max-w-2xl mx-auto drop-shadow-lg font-light leading-relaxed">
                Descubrí nuestra exclusiva colección de vinos premium, cuidadosamente seleccionados de las mejores
                bodegas. Cada botella cuenta una historia única de tradición y excelencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setActiveSection("promos")}
                  className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-8 py-4 text-lg font-semibold shadow-xl border-0 transition-all duration-300 hover:scale-105"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Ver Promociones
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveSection("contacto")}
                  className="border-2 border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contactar
                </Button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Promos Section */}
      {activeSection === "promos" && (
        <main className="relative py-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=1200&text=Wine+glasses+and+bottles+on+elegant+table+setting')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-900/60 to-black/80" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">Promociones Especiales</h2>
              <p className="text-xl text-gray-300 font-light">Aprovechá nuestras ofertas exclusivas en vinos premium</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promos.map((promo, index) => (
                <Card
                  key={index}
                  className="bg-black/40 border-rose-500/30 hover:border-rose-500/60 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-2">
                    <div className="flex gap-4">
                      <div className="w-24 h-32 flex-shrink-0">
                        <img
                          src={promo.image || "/placeholder.svg"}
                          alt={promo.title}
                          className="w-full h-full object-cover rounded-md border border-rose-500/30"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg font-playfair mb-1">{promo.title}</CardTitle>
                        <p className="text-rose-400 text-sm font-medium">{promo.varietal}</p>
                        <p className="text-gray-400 text-xs">{promo.region}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4 font-light leading-relaxed">{promo.description}</p>

                    {promo.wines ? (
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2 font-playfair text-sm">Incluye:</h4>
                        <ul className="text-gray-300 text-xs space-y-1">
                          {promo.wines.map((wine, wineIndex) => (
                            <li key={wineIndex} className="flex items-start font-light">
                              <Wine className="h-3 w-3 text-rose-400 mr-2 flex-shrink-0 mt-0.5" />
                              {wine}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mb-4">
                      <div className="text-rose-400 font-bold text-xl font-playfair">{promo.price}</div>
                      <div className="text-gray-400 text-xs">{promo.priceType}</div>
                      {promo.alternativePrice && (
                        <div className="text-amber-400 text-sm font-medium mt-1">{promo.alternativePrice}</div>
                      )}
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() => setActiveSection("contacto")}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Consultar Disponibilidad
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Contacto Section */}
      {activeSection === "contacto" && (
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">Contactanos</h2>
              <p className="text-xl text-gray-300 font-light">
                Estamos aquí para ayudarte a encontrar el vino perfecto
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon
                return (
                  <Card
                    key={index}
                    className="bg-black/40 border-rose-500/30 hover:border-rose-500/60 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-red-700 to-red-800 p-3 rounded-full">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-1 font-playfair">{contact.type}</h3>
                          <p className="text-gray-300 text-sm mb-3 font-light">{contact.description}</p>
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-400 hover:text-rose-300 font-semibold text-lg transition-colors"
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-black/60 border-t border-rose-500/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Wine className="h-6 w-6 text-rose-400" />
            <span className="text-white font-bold text-lg font-playfair">Vinos a tu casa</span>
          </div>
          <p className="text-gray-400 font-light">© 2024 Vinos a tu casa. Todos los derechos reservados.</p>
          <p className="text-gray-500 text-sm mt-2 font-light">
            Venta de bebidas alcohólicas prohibida a menores de 18 años
          </p>
        </div>
      </footer>
    </div>
  )
}
