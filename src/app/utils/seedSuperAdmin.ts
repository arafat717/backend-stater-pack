/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";


export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
        if (isSuperAdminExist) {
            return;
        }

        const hashedPassword = bcrypt.hashSync(envVars.SUPER_ADMIN_PASSWORD!, 12);

        const superAdmin = await User.create({
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: "SUPER_ADMIN",
            isVerified: true,
            auths: [{ provider: 'credentials', providerId: envVars.SUPER_ADMIN_EMAIL! }]
        });

        await User.create(superAdmin);

    } catch (error) {
        console.error("Error seeding super admin user:", error);
    }
}