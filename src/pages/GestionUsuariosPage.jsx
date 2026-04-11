import { useState } from "react";
import { useToast } from "@/context/ToastContext.jsx";

export default function GestionUsuariosPage() {
  const { success } = useToast();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState("Todos los Roles");
  const [filterStatus, setFilterStatus] = useState("Cualquier Estado");
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editableModules, setEditableModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [users, setUsers] = useState([
    {
      id: 1,
      initials: "AM",
      nombre: "Adriana Mendoza",
      email: "adriana.mendoza@monolith.com",
      rol: "ADMINISTRADOR",
      estado: "ACTIVO",
      ultimoAcceso: "Hoy 10:42 AM",
      modules: ["Dashboard Principal", "Registro de Afiliada", "Módulo de Consulta", "Reportes Estadísticos", "Gestión de Usuarios"],
      fechaCreacion: "15 de Enero, 2024",
      ultimaModificacion: "10 de Abril, 2026",
    },
    {
      id: 2,
      initials: "RP",
      nombre: "Ricardo Peralta",
      email: "ricardo.p@monolith.com",
      rol: "OPERADOR",
      estado: "ACTIVO",
      ultimoAcceso: "Ayer 8:15 PM",
      modules: ["Dashboard Principal", "Registro de Afiliada", "Módulo de Consulta"],
      fechaCreacion: "22 de Marzo, 2024",
      ultimaModificacion: "8 de Abril, 2026",
    },
    {
      id: 3,
      initials: "SC",
      nombre: "Sofía Cisneros",
      email: "sofia.cisneros@monolith.com",
      rol: "AUDITOR",
      estado: "INACTIVO",
      ultimoAcceso: "13 Oct 2023",
      modules: ["Reportes Estadísticos"],
      fechaCreacion: "10 de Octubre, 2023",
      ultimaModificacion: "13 de Octubre, 2023",
    },
    {
      id: 4,
      initials: "JG",
      nombre: "Javier Gómez",
      email: "javier.g@monolith.com",
      rol: "OPERADOR",
      estado: "ACTIVO",
      ultimoAcceso: "Hoy 3 horas",
      modules: ["Dashboard Principal", "Registro de Afiliada", "Módulo de Consulta", "Reportes Estadísticos"],
      fechaCreacion: "5 de Febrero, 2024",
      ultimaModificacion: "9 de Abril, 2026",
    },
    {
      id: 5,
      initials: "CV",
      nombre: "Catalina Vélez",
      email: "catalina.v@monolith.com",
      rol: "AUDITOR",
      estado: "ACTIVO",
      ultimoAcceso: "Hoy 9:15 AM",
      modules: ["Reportes Estadísticos"],
      fechaCreacion: "12 de Marzo, 2024",
      ultimaModificacion: "8 de Abril, 2026",
    },
    {
      id: 6,
      initials: "MP",
      nombre: "Martín Pérez",
      email: "martin.p@monolith.com",
      rol: "OPERADOR",
      estado: "INACTIVO",
      ultimoAcceso: "2 de Abril, 2026",
      modules: ["Dashboard Principal", "Módulo de Consulta"],
      fechaCreacion: "19 de Enero, 2024",
      ultimaModificacion: "2 de Abril, 2026",
    },
    {
      id: 7,
      initials: "LR",
      nombre: "Laura Rodríguez",
      email: "laura.r@monolith.com",
      rol: "ADMINISTRADOR",
      estado: "ACTIVO",
      ultimoAcceso: "Ayer 11:30 PM",
      modules: ["Dashboard Principal", "Registro de Afiliada", "Módulo de Consulta", "Reportes Estadísticos", "Gestión de Usuarios"],
      fechaCreacion: "28 de Febrero, 2024",
      ultimaModificacion: "7 de Abril, 2026",
    },
    {
      id: 8,
      initials: "DC",
      nombre: "Diego Castillo",
      email: "diego.c@monolith.com",
      rol: "OPERADOR",
      estado: "ACTIVO",
      ultimoAcceso: "Hoy 1:45 PM",
      modules: ["Dashboard Principal", "Registro de Afiliada"],
      fechaCreacion: "15 de Marzo, 2024",
      ultimaModificacion: "10 de Abril, 2026",
    },
    {
      id: 9,
      initials: "FS",
      nombre: "Fernanda Silva",
      email: "fernanda.s@monolith.com",
      rol: "AUDITOR",
      estado: "ACTIVO",
      ultimoAcceso: "Ayer 4:20 PM",
      modules: ["Reportes Estadísticos", "Dashboard Principal"],
      fechaCreacion: "8 de Abril, 2024",
      ultimaModificacion: "7 de Abril, 2026",
    },
    {
      id: 10,
      initials: "AR",
      nombre: "Andrés Rivas",
      email: "andres.r@monolith.com",
      rol: "OPERADOR",
      estado: "ACTIVO",
      ultimoAcceso: "Hoy 10:20 AM",
      modules: ["Dashboard Principal", "Registro de Afiliada", "Módulo de Consulta"],
      fechaCreacion: "25 de Febrero, 2024",
      ultimaModificacion: "8 de Abril, 2026",
    },
  ]);

  const allModules = [
    { id: "dashboard", name: "Dashboard Principal", icon: "grid_view" },
    { id: "registro", name: "Registro de Afiliada", icon: "person_add" },
    { id: "consulta", name: "Módulo de Consulta", icon: "search" },
    { id: "reportes", name: "Reportes Estadísticos", icon: "bar_chart" },
    { id: "usuarios", name: "Gestión de Usuarios", icon: "group" },
  ];

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setEditingUser(null);
    setShowUpdatePanel(false);
  };

  const handleOpenUpdatePanel = () => {
    if (currentUser) {
      setEditingUser({ ...currentUser });
      setEditableModules([...currentUser.modules]);
      setShowUpdatePanel(true);
    }
  };

  const handleToggleModule = (moduleName) => {
    setEditableModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  const handleSavePermissions = () => {
    if (!editingUser) return;

    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            modules: editableModules,
            ultimaModificacion: "Hoy " + new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
          }
        : user
    );

    setUsers(updatedUsers);
    const updatedUser = updatedUsers.find((u) => u.id === editingUser.id);
    setSelectedUser(updatedUser);
    setUpdateSuccess(true);
    setShowUpdatePanel(false);
    success(`✓ Permisos actualizados para ${editingUser.nombre}`);

    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const handleChangeRole = (newRole) => {
    setEditingUser({ ...editingUser, rol: newRole });
  };

  const handleChangeStatus = (newStatus) => {
    setEditingUser({ ...editingUser, estado: newStatus });
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole === "Todos los Roles" || user.rol === filterRole;
    const statusMatch = filterStatus === "Cualquier Estado" || user.estado === filterStatus;
    return roleMatch && statusMatch;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  const currentUser = selectedUser || (paginatedUsers.length > 0 ? paginatedUsers[0] : null);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 h-0.5 w-10 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Sistema de Autoridad
          </p>
          <h2 className="mt-2 text-3xl font-bold text-sinfal-navy">
            Gestión de Usuarios
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Control administrativo centralizado para el monitoreo de accesos, perfiles de seguridad y asignación de privilegios institucionales.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-sinfal-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90">
          <span className="material-symbols-outlined text-[18px]">add</span>
          NUEVO USUARIO
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase text-slate-600">
            FILTRAR POR ROL
          </label>
          <select
            value={filterRole}
            onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 hover:border-slate-400"
          >
            <option>Todos los Roles</option>
            <option>ADMINISTRADOR</option>
            <option>OPERADOR</option>
            <option>AUDITOR</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase text-slate-600">
            ESTADO
          </label>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 hover:border-slate-400"
          >
            <option>Cualquier Estado</option>
            <option>ACTIVO</option>
            <option>INACTIVO</option>
          </select>
        </div>
      </div>

      {/* Contenido principal - Grid 2 columnas */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tabla de Usuarios - 2 columnas */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-200 p-6">
              <p className="text-xs font-semibold uppercase text-slate-600">
                Mostrando {itemsPerPage} de {filteredUsers.length} usuarios institucionales (Página {currentPage} de {totalPages})
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      NOMBRE
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      ROL
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      ESTADO
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      ÚLTIMO ACCESO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        currentUser?.id === user.id ? "bg-slate-100" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sinfal-navy text-xs font-bold text-white">
                            {user.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {user.nombre}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                          {user.rol}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              user.estado === "ACTIVO"
                                ? "bg-emerald-600"
                                : "bg-red-600"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold ${
                              user.estado === "ACTIVO"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {user.estado}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 text-xs">
                        {user.ultimoAcceso}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between text-xs text-slate-600">
              <p>Página {currentPage} de {totalPages}</p>
              <div className="flex gap-1">
                <button 
                  onClick={() => { handlePageChange(currentPage - 1); success(`Página ${currentPage - 1}`); }}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => { handlePageChange(page); success(`Página ${page}`); }}
                    className={`px-3 py-1 rounded ${
                      page === currentPage 
                        ? 'bg-sinfal-navy text-white' 
                        : 'border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => { handlePageChange(currentPage + 1); success(`Página ${currentPage + 1}`); }}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Configuración - 1 columna */}
        {currentUser && (
          <div className="space-y-6">
            {/* Card de Perfil */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-bold text-slate-600 uppercase">
                Configuración de Perfil
              </h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sinfal-navy text-sm font-bold text-white">
                  {currentUser.initials}
                </div>
                <div>
                  <p className="font-semibold text-sinfal-navy">
                    {currentUser.nombre}
                  </p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-600">
                    Rol
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    {currentUser.rol}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-600">
                    Estado
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        currentUser.estado === "ACTIVO"
                          ? "bg-emerald-600"
                          : "bg-red-600"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        currentUser.estado === "ACTIVO"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {currentUser.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acceso a Módulos */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-bold text-slate-600 uppercase">
                Acceso a Módulos
              </h3>
              <div className="space-y-2">
                {allModules.map((module) => {
                  const isAllowed =
                    currentUser.modules &&
                    currentUser.modules.includes(module.name);
                  return (
                    <div
                      key={module.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-slate-50"
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isAllowed ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {isAllowed ? "check_circle" : "radio_button_unchecked"}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isAllowed ? "text-slate-700" : "text-slate-400"
                        }`}
                      >
                        {module.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón Actualizar */}
            <button
              onClick={handleOpenUpdatePanel}
              className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-sm font-semibold uppercase transition-colors"
            >
              Actualizar Permisos
            </button>

            {/* Notificación de éxito */}
            {updateSuccess && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                    check_circle
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-emerald-900">
                      ✓ Permisos Actualizados
                    </p>
                    <p className="text-xs text-emerald-700">
                      Los cambios han sido guardados exitosamente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Restaurar Valores */}
            <div className="text-center">
              <p className="text-xs text-slate-500">RESTAURAR VALORES</p>
            </div>

            {/* Card de Seguridad */}
            <div className="rounded-xl bg-gradient-to-br from-sinfal-navy to-sinfal-navy/90 text-white p-4">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-2xl mt-1">
                  shield
                </span>
                <div>
                  <p className="text-xs font-bold uppercase mb-1">
                    Seguridad Institucional
                  </p>
                  <p className="text-xs text-white/90 leading-relaxed">
                    Todos los cambios en los permisos de usuario se registran en el historial de auditoría institucional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel de Actualización de Permisos - Modal Overlay */}
        {showUpdatePanel && editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-sinfal-navy to-sinfal-navy/90 text-white p-6 flex items-center justify-between border-b border-white/10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
                    Gestión de Permisos
                  </p>
                  <h3 className="text-xl font-bold mt-1">{editingUser.nombre}</h3>
                </div>
                <button
                  onClick={() => setShowUpdatePanel(false)}
                  className="text-white hover:bg-white/10 p-2 rounded-lg"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-6">
                {/* Información del Usuario */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase text-slate-600 mb-3">
                    Información Personal
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Email:</span> {editingUser.email}
                    </p>
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Creado:</span> {editingUser.fechaCreacion}
                    </p>
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Última modificación:</span>{" "}
                      {editingUser.ultimaModificacion}
                    </p>
                  </div>
                </div>

                {/* Edición de Rol */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-600 mb-2 block">
                    Rol Institucional
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["ADMINISTRADOR", "OPERADOR", "AUDITOR"].map((role) => (
                      <button
                        key={role}
                        onClick={() => handleChangeRole(role)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                          editingUser.rol === role
                            ? "bg-sinfal-navy text-white border-sinfal-navy shadow-md scale-105"
                            : "bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edición de Estado */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-600 mb-2 block">
                    Estado del Usuario
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["ACTIVO", "INACTIVO"].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleChangeStatus(status)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border flex items-center justify-center gap-2 ${
                          editingUser.estado === status
                            ? status === "ACTIVO"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-300 shadow-md scale-105"
                              : "bg-red-100 text-red-700 border-red-300 shadow-md scale-105"
                            : "bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {status === "ACTIVO" ? "check_circle" : "block"}
                        </span>
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acceso a Módulos */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-600 mb-3 block">
                    Acceso a Módulos ({editableModules.length}/{allModules.length})
                  </label>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
                    {allModules.map((module) => {
                      const isChecked = editableModules.includes(module.name);
                      return (
                        <button
                          key={module.id}
                          onClick={() => handleToggleModule(module.name)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all border ${
                            isChecked
                              ? "bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                              : "bg-white border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 h-5 w-5 rounded border flex items-center justify-center transition-all ${
                              isChecked
                                ? "bg-emerald-600 border-emerald-600"
                                : "border-slate-300"
                            }`}
                          >
                            {isChecked && (
                              <span className="material-symbols-outlined text-white text-[16px]">
                                check
                              </span>
                            )}
                          </div>
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isChecked ? "text-emerald-600" : "text-slate-400"
                            }`}
                          >
                            {module.icon}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              isChecked ? "text-slate-900" : "text-slate-600"
                            }`}
                          >
                            {module.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Historial de Cambios */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase text-blue-900 mb-2">
                    ℹ️ Auditoría
                  </p>
                  <p className="text-xs text-blue-800">
                    Se registrará: Cambios de rol, estado, módulos y timestamp de modificación.
                  </p>
                </div>
              </div>

              {/* Footer con botones */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-6 flex gap-3">
                <button
                  onClick={() => setShowUpdatePanel(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePermissions}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">save</span>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
