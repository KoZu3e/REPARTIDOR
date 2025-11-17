import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Camera, Phone, Mail, Car } from "lucide-react";

type ModalType = "none" | "confirm-save" | "phone-verify" | "photo-verify" | "logout" | "success";

export default function Perfil() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState<ModalType>("none");
  const [showNotification, setShowNotification] = useState(false);

  const [data, setData] = useState({
    name: "Josué Samuel Parra",
    phone: "+56 9 1234 5678",
    email: "josue@elcomillon.app",
    plateNumber: "JOSA-124",
    vehicleModel: "Honda CB 150",
    vehicleColor: "Negro",
  });

  const [editData, setEditData] = useState(data);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(data);
  };

  const handleSave = () => {
    setModal("confirm-save");
  };

  const handleConfirmSave = () => {
    setData(editData);
    setIsEditing(false);
    setModal("success");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogout = () => {
    setModal("logout");
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      <header className="pt-6 pb-4 text-center border-b animate-fade-in">
        <h1 className="text-2xl font-semibold text-foreground">Perfil</h1>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Photo Section */}
        <div className="flex justify-center animate-scale-in" style={{ animationDelay: "50ms" }}>
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg card-animated hover:shadow-xl">
              <span className="text-4xl font-bold text-white">JP</span>
            </div>
            {isEditing && (
              <button
                onClick={() => setModal("photo-verify")}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:opacity-90 active:opacity-80"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm card-animated animate-scale-in" style={{ animationDelay: "100ms" }}>
            <label className="text-xs font-medium text-muted-foreground uppercase">Nombre</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full mt-2 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            ) : (
              <p className="mt-2 text-foreground font-medium">{data.name}</p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm card-animated animate-scale-in" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <label className="text-xs font-medium text-muted-foreground uppercase">Teléfono</label>
            </div>
            {isEditing ? (
              <button
                onClick={() => setModal("phone-verify")}
                className="w-full mt-2 px-3 py-2 rounded-lg border text-left text-primary font-medium focus:outline-none hover:bg-primary/5"
              >
                {editData.phone}
                <span className="text-xs text-muted-foreground ml-1">(Requiere verificación)</span>
              </button>
            ) : (
              <p className="mt-2 text-foreground font-medium">{data.phone}</p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm card-animated animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <label className="text-xs font-medium text-muted-foreground uppercase">Email</label>
            </div>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full mt-2 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            ) : (
              <p className="mt-2 text-foreground font-medium">{data.email}</p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm card-animated animate-scale-in" style={{ animationDelay: "250ms" }}>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-muted-foreground" />
              <label className="text-xs font-medium text-muted-foreground uppercase">Vehículo</label>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Placa</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.plateNumber}
                    onChange={(e) => setEditData({ ...editData, plateNumber: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{data.plateNumber}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Modelo</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.vehicleModel}
                    onChange={(e) => setEditData({ ...editData, vehicleModel: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{data.vehicleModel}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Color</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.vehicleColor}
                    onChange={(e) => setEditData({ ...editData, vehicleColor: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{data.vehicleColor}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 animate-scale-in" style={{ animationDelay: "300ms" }}>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 btn-ripple"
            >
              Editar información
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 btn-ripple animate-scale-in"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData(data);
                }}
                className="h-12 rounded-xl bg-muted text-foreground font-semibold hover:bg-gray-200 active:scale-95 transition-all duration-150"
              >
                Cancelar
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="h-12 rounded-xl text-primary border-2 border-primary font-semibold hover:bg-primary/5 active:scale-95 transition-all duration-150"
          >
            Cerrar sesión
          </button>
        </div>
      </main>

      {/* Modals */}

      {/* Confirm Save Modal */}
      {modal === "confirm-save" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fade-in">
          <div className="w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:mx-4 bg-white p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold text-foreground mb-2">Confirmar cambios</h2>
            <p className="text-muted-foreground mb-4">
              ¿Deseas guardar los cambios? No podrás modificar esta información durante los próximos 30 días.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModal("none")}
                className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSave}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-95"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone Verify Modal */}
      {modal === "phone-verify" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fade-in">
          <div className="w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:mx-4 bg-white p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold text-foreground mb-2">Verificación requerida</h2>
            <p className="text-muted-foreground mb-4">
              Para cambiar tu número de teléfono, debe ser verificado. Recibirás un SMS o llamada de confirmación.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModal("none")}
                className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModal("none")}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-95"
              >
                Enviar código
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Verify Modal */}
      {modal === "photo-verify" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fade-in">
          <div className="w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:mx-4 bg-white p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold text-foreground mb-2">Cambiar foto de perfil</h2>
            <p className="text-muted-foreground mb-4">
              Selecciona una foto clara de frente para actualizar tu perfil.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModal("none")}
                className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModal("none")}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-95"
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {modal === "logout" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fade-in">
          <div className="w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:mx-4 bg-white p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold text-foreground mb-2">¿Cerrar sesión?</h2>
            <p className="text-muted-foreground mb-4">
              Deberás ingresar nuevamente con tu correo y contraseña.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModal("none")}
                className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-95"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto bg-green-100 text-green-700 px-4 py-3 rounded-xl shadow-lg animate-pulse">
          ✓ Los cambios han sido guardados
        </div>
      )}
    </div>
  );
}
