"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Save, Settings, Mail, MessageSquare, BarChart3, Megaphone, CheckCircle, X } from "lucide-react"

export default function MarketingConfiguracionPage() {
  const { toast } = useToast()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<any>(null)
  const [emailSettings, setEmailSettings] = useState({
    sendWelcomeEmail: true,
    sendBirthdayEmail: true,
    sendPromotionalEmail: true,
    sendAppointmentReminder: true,
    sendFeedbackRequest: true,
    emailSignature: "Atentamente,\nEquipo de Marketing\nSu Empresa de Belleza\nTel: (123) 456-7890\nwww.suempresa.com",
  })
  const [smsSettings, setSmsSettings] = useState({
    sendAppointmentReminder: true,
    sendPromotionalSMS: false,
    sendBirthdaySMS: true,
    smsSignature: "Su Empresa de Belleza",
  })
  const [socialSettings, setSocialSettings] = useState({
    autoPostToFacebook: true,
    autoPostToInstagram: false,
    autoPostToTwitter: true,
    postFrequency: "semanal",
  })

  // Plantillas de correo electrónico
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: "Bienvenida",
      subject: "¡Bienvenido/a a nuestra familia!",
      content:
        "Estimado/a [NOMBRE],\n\nEs un placer darte la bienvenida a nuestra familia. Gracias por confiar en nosotros para tus servicios de belleza.\n\nComo nuevo cliente, queremos ofrecerte un 10% de descuento en tu próxima visita. Simplemente menciona este correo al hacer tu reserva.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\n[FIRMA]",
      lastEdited: "15/05/2023",
    },
    {
      id: 2,
      name: "Cumpleaños",
      subject: "¡Feliz Cumpleaños de parte de nuestro equipo!",
      content:
        "Estimado/a [NOMBRE],\n\n¡Feliz cumpleaños! En este día tan especial, queremos celebrarte con un regalo especial: 20% de descuento en cualquier servicio de tu elección, válido durante todo el mes de tu cumpleaños.\n\nEsperamos verte pronto para consentirte como mereces.\n\n[FIRMA]",
      lastEdited: "10/04/2023",
    },
    {
      id: 3,
      name: "Recordatorio de Cita",
      subject: "Recordatorio: Tu cita está programada para mañana",
      content:
        "Estimado/a [NOMBRE],\n\nTe recordamos que tienes una cita programada para mañana [FECHA] a las [HORA] para [SERVICIO].\n\nSi necesitas reprogramar, por favor contáctanos con al menos 24 horas de anticipación.\n\n¡Esperamos verte pronto!\n\n[FIRMA]",
      lastEdited: "22/05/2023",
    },
    {
      id: 4,
      name: "Solicitud de Valoración",
      subject: "¿Cómo fue tu experiencia con nosotros?",
      content:
        "Estimado/a [NOMBRE],\n\nEsperamos que hayas disfrutado de tu reciente visita para [SERVICIO]. Nos encantaría conocer tu opinión sobre nuestro servicio.\n\nPor favor, tómate un momento para responder a esta breve encuesta: [ENLACE_ENCUESTA]\n\nTu opinión es muy importante para nosotros y nos ayuda a mejorar constantemente.\n\n[FIRMA]",
      lastEdited: "05/05/2023",
    },
    {
      id: 5,
      name: "Promoción Especial",
      subject: "¡Oferta exclusiva solo para ti!",
      content:
        "Estimado/a [NOMBRE],\n\nQueremos ofrecerte una promoción exclusiva: 15% de descuento en todos nuestros servicios durante la próxima semana.\n\nEsta oferta es válida del [FECHA_INICIO] al [FECHA_FIN]. Reserva tu cita ahora para aprovechar esta oportunidad.\n\n[FIRMA]",
      lastEdited: "18/05/2023",
    },
  ])

  // Plantillas de SMS
  const [smsTemplates, setSmsTemplates] = useState([
    {
      id: 1,
      name: "Recordatorio de Cita SMS",
      content:
        "Hola [NOMBRE], te recordamos tu cita mañana a las [HORA] para [SERVICIO]. Confirma respondiendo SI o llama al (123) 456-7890 para reprogramar. [FIRMA]",
      lastEdited: "20/05/2023",
    },
    {
      id: 2,
      name: "Cumpleaños SMS",
      content:
        "¡Feliz cumpleaños [NOMBRE]! Te regalamos 20% de descuento en cualquier servicio este mes. Reserva ya: (123) 456-7890. [FIRMA]",
      lastEdited: "12/04/2023",
    },
    {
      id: 3,
      name: "Promoción SMS",
      content:
        "¡Oferta especial! 15% de descuento en todos los servicios hasta el [FECHA_FIN]. Reserva ahora: (123) 456-7890. [FIRMA]",
      lastEdited: "15/05/2023",
    },
  ])

  const handleSaveEmailSettings = () => {
    showAlert("Configuración de correo electrónico guardada correctamente")
  }

  const handleSaveSMSSettings = () => {
    showAlert("Configuración de SMS guardada correctamente")
  }

  const handleSaveSocialSettings = () => {
    showAlert("Configuración de redes sociales guardada correctamente")
  }

  const handleEditTemplate = (template: any, type: string) => {
    setCurrentTemplate({ ...template, type })
    setShowTemplateDialog(true)
  }

  const handleSaveTemplate = () => {
    if (currentTemplate.type === "email") {
      const updatedTemplates = emailTemplates.map((template) =>
        template.id === currentTemplate.id
          ? { ...currentTemplate, lastEdited: new Date().toLocaleDateString("es-ES") }
          : template,
      )
      setEmailTemplates(updatedTemplates)
    } else {
      const updatedTemplates = smsTemplates.map((template) =>
        template.id === currentTemplate.id
          ? { ...currentTemplate, lastEdited: new Date().toLocaleDateString("es-ES") }
          : template,
      )
      setSmsTemplates(updatedTemplates)
    }

    setShowTemplateDialog(false)
    showAlert("Plantilla guardada correctamente")
  }

  const showAlert = (message: string) => {
    setAlertMessage(message)
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  // Animación para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          {showSuccessAlert && (
            <motion.div
              className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>{alertMessage}</span>
              <button onClick={() => setShowSuccessAlert(false)} className="ml-4">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Configuración de Marketing</h1>
              <Button className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuración General
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Campañas Activas</CardTitle>
                  <CardDescription>Campañas de marketing en curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-gray-500">2 programadas para la próxima semana</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tasa de Apertura</CardTitle>
                  <CardDescription>Promedio de correos abiertos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32.8%</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    <span>+5.2% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tasa de Conversión</CardTitle>
                  <CardDescription>Clientes que realizaron compras</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.4%</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    <span>+2.1% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Tabs defaultValue="email">
                <TabsList className="mb-4">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Correo Electrónico
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    SMS
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    Redes Sociales
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Plantillas
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración de Correo Electrónico</CardTitle>
                      <CardDescription>
                        Configura las opciones para el envío automático de correos electrónicos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Correo de Bienvenida</Label>
                            <p className="text-sm text-gray-500">
                              Enviar automáticamente cuando un cliente se registra
                            </p>
                          </div>
                          <Switch
                            checked={emailSettings.sendWelcomeEmail}
                            onCheckedChange={(checked) =>
                              setEmailSettings({ ...emailSettings, sendWelcomeEmail: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Correo de Cumpleaños</Label>
                            <p className="text-sm text-gray-500">Enviar automáticamente en el cumpleaños del cliente</p>
                          </div>
                          <Switch
                            checked={emailSettings.sendBirthdayEmail}
                            onCheckedChange={(checked) =>
                              setEmailSettings({ ...emailSettings, sendBirthdayEmail: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Correos Promocionales</Label>
                            <p className="text-sm text-gray-500">Enviar correos con promociones y ofertas especiales</p>
                          </div>
                          <Switch
                            checked={emailSettings.sendPromotionalEmail}
                            onCheckedChange={(checked) =>
                              setEmailSettings({ ...emailSettings, sendPromotionalEmail: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Recordatorio de Citas</Label>
                            <p className="text-sm text-gray-500">Enviar recordatorio 24 horas antes de la cita</p>
                          </div>
                          <Switch
                            checked={emailSettings.sendAppointmentReminder}
                            onCheckedChange={(checked) =>
                              setEmailSettings({ ...emailSettings, sendAppointmentReminder: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Solicitud de Valoración</Label>
                            <p className="text-sm text-gray-500">Enviar solicitud de valoración después del servicio</p>
                          </div>
                          <Switch
                            checked={emailSettings.sendFeedbackRequest}
                            onCheckedChange={(checked) =>
                              setEmailSettings({ ...emailSettings, sendFeedbackRequest: checked })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Firma de Correo Electrónico</Label>
                          <Textarea
                            value={emailSettings.emailSignature}
                            onChange={(e) => setEmailSettings({ ...emailSettings, emailSignature: e.target.value })}
                            rows={4}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-4 flex justify-end">
                      <Button onClick={handleSaveEmailSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Guardar Configuración
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración de SMS</CardTitle>
                      <CardDescription>Configura las opciones para el envío automático de mensajes SMS</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Recordatorio de Citas</Label>
                            <p className="text-sm text-gray-500">
                              Enviar recordatorio por SMS 2 horas antes de la cita
                            </p>
                          </div>
                          <Switch
                            checked={smsSettings.sendAppointmentReminder}
                            onCheckedChange={(checked) =>
                              setSmsSettings({ ...smsSettings, sendAppointmentReminder: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Promocionales</Label>
                            <p className="text-sm text-gray-500">Enviar SMS con promociones y ofertas especiales</p>
                          </div>
                          <Switch
                            checked={smsSettings.sendPromotionalSMS}
                            onCheckedChange={(checked) =>
                              setSmsSettings({ ...smsSettings, sendPromotionalSMS: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS de Cumpleaños</Label>
                            <p className="text-sm text-gray-500">
                              Enviar felicitación por SMS en el cumpleaños del cliente
                            </p>
                          </div>
                          <Switch
                            checked={smsSettings.sendBirthdaySMS}
                            onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, sendBirthdaySMS: checked })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Firma de SMS</Label>
                          <Input
                            value={smsSettings.smsSignature}
                            onChange={(e) => setSmsSettings({ ...smsSettings, smsSignature: e.target.value })}
                          />
                          <p className="text-xs text-gray-500">Esta firma se añadirá al final de cada SMS enviado</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-4 flex justify-end">
                      <Button onClick={handleSaveSMSSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Guardar Configuración
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración de Redes Sociales</CardTitle>
                      <CardDescription>Configura la integración con tus redes sociales</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Publicación Automática en Facebook</Label>
                            <p className="text-sm text-gray-500">Publicar automáticamente promociones en Facebook</p>
                          </div>
                          <Switch
                            checked={socialSettings.autoPostToFacebook}
                            onCheckedChange={(checked) =>
                              setSocialSettings({ ...socialSettings, autoPostToFacebook: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Publicación Automática en Instagram</Label>
                            <p className="text-sm text-gray-500">Publicar automáticamente promociones en Instagram</p>
                          </div>
                          <Switch
                            checked={socialSettings.autoPostToInstagram}
                            onCheckedChange={(checked) =>
                              setSocialSettings({ ...socialSettings, autoPostToInstagram: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Publicación Automática en Twitter</Label>
                            <p className="text-sm text-gray-500">Publicar automáticamente promociones en Twitter</p>
                          </div>
                          <Switch
                            checked={socialSettings.autoPostToTwitter}
                            onCheckedChange={(checked) =>
                              setSocialSettings({ ...socialSettings, autoPostToTwitter: checked })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Frecuencia de Publicación</Label>
                          <Select
                            value={socialSettings.postFrequency}
                            onValueChange={(value) => setSocialSettings({ ...socialSettings, postFrequency: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar frecuencia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diaria">Diaria</SelectItem>
                              <SelectItem value="semanal">Semanal</SelectItem>
                              <SelectItem value="quincenal">Quincenal</SelectItem>
                              <SelectItem value="mensual">Mensual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-4 flex justify-end">
                      <Button onClick={handleSaveSocialSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Guardar Configuración
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Plantillas de Correo Electrónico</CardTitle>
                      <CardDescription>
                        Gestiona las plantillas para tus comunicaciones por correo electrónico
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {emailTemplates.map((template, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-gray-500">Última edición: {template.lastEdited}</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">Asunto: {template.subject}</div>
                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template, "email")}>
                                Editar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Plantillas de SMS</CardTitle>
                      <CardDescription>Gestiona las plantillas para tus comunicaciones por SMS</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {smsTemplates.map((template, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-gray-500">Última edición: {template.lastEdited}</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-500 line-clamp-2">{template.content}</div>
                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template, "sms")}>
                                Editar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </main>

      </div>

      {/* Diálogo para editar plantilla */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Plantilla</DialogTitle>
            <DialogDescription>
              Modifica la plantilla según tus necesidades. Puedes usar las etiquetas [NOMBRE], [FECHA], [HORA],
              [SERVICIO], [FIRMA], etc.
            </DialogDescription>
          </DialogHeader>
          {currentTemplate && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="template-name"
                  value={currentTemplate.name}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              {currentTemplate.type === "email" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-subject" className="text-right">
                    Asunto
                  </Label>
                  <Input
                    id="template-subject"
                    value={currentTemplate.subject}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-content" className="text-right">
                  Contenido
                </Label>
                <Textarea
                  id="template-content"
                  value={currentTemplate.content}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                  className="col-span-3"
                  rows={8}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTemplate}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


