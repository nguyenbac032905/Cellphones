export const getLastName = (fullName: string): string => {
    const lastName = fullName.trim().split(/\s+/).pop() || "";

    return lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
};