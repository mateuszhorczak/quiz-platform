import type { User, NewUser, UserAuthentication } from '~/types'

const emptyUser: User = {
  id: 0,
  username: "",
  email: "",
  userQuizzesId: [],
}

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie<string | null>("auth:token", { default: () => null, watch: true })
  const user = useCookie<User>("auth:user", { default: () => emptyUser, watch: true })

  const login = async (userAuth: UserAuthentication) => {
    try {
      const data = await $fetch<{ token: string; user: User }>("/api/auth/login", {
        method: "POST",
        body: userAuth,
      })

      token.value = data.token
      user.value = data.user

      return { success: true, data }
    }
    catch (error: any) {
      return {
        success: false,
        error: error.data?.statusMessage || error.message
      }
    }
  }

  const register = async (user: NewUser) => {
    try {
      const response = await $fetch("/api/auth/register", {
        method: "POST",
        body: user,
      })

      return {
        success: true,
        data: response.data
      }
    }
    catch (error: any) {
      return {
        success: false,
        error: error.data?.statusMessage || error.message
      }
    }
  }

  const logout = () => {
    token.value = null
    user.value = emptyUser
  }

  const isLoggedIn = computed(() => !!token.value)

  return {
    login,
    logout,
    register,
    isLoggedIn,
    user,
    token,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
