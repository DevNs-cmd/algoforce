import { useAuth } from '../contexts/AuthContext'

export function usePermissions() {
  const { userRole, userDepartment } = useAuth()

  const can = (action) => {
    const role = userRole?.toLowerCase()
    switch (action) {
      case 'approve':
        return ['owner', 'admin', 'manager'].includes(role)
      case 'view_billing':
        return ['owner', 'admin', 'finance'].includes(role)
      case 'invite_users':
        return ['owner', 'admin'].includes(role)
      default:
        return false
    }
  }

  return {
    can,
    role: userRole,
    department: userDepartment
  }
}
