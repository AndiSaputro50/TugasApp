import React from 'react';
import { motion } from 'framer-motion';
import logobinus from '../asset/logobinus.png';

const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1, x: 0,
        transition:
        {
            duration: 0.6,
            delay: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1, x: 0,
        transition:
        {
            duration: 0.6,
            delay: 0.3
        }
    }
};

const logoVariants = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.2,
            yoyo: Infinity // Untuk membuat animasi berulang saat hover
        }
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '20px',
    },
    logo: {
        maxWidth: '200px',
    },
    content: {
        width: '100%',
    },
    visiMisi: {
        display: 'flex',
        justifyContent: 'center',
    },
    visi: {
        fontWeight: 'bold',
        flexBasis: '45%',
        marginTop: '20px',
    },
    misi: {
        flexBasis: '45%',
        marginTop: '20px',
    },
    visiText: {
        fontStyle: 'italic',
        marginRight: '10px',
    },
    misiText: {
        marginRight: '10px',
        marginBottom: '10px',
    },
    '@media (max-width: 600px)': {
        container: {
            alignItems: 'flex-start',
        },
        logoContainer: {
            marginBottom: '10px',
        },
        visiMisi: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        visi: {
            flexBasis: '100%',
        },
        misi: {
            flexBasis: '100%',
        },
    },
};

function VisiMisi() {
    return (
        <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate="visible">
            <div style={styles.logoContainer}>
                <motion.img
                    className='mt-5'
                    src={logobinus}
                    alt="SMK Bina Nusantara Semarang"
                    style={styles.logo}
                    variants={logoVariants}
                    whileHover="hover"
                />
            </div>
            <div style={styles.content}>
                <div style={styles.visiMisi}>
                    <motion.div style={styles.visi} variants={itemVariants}>
                        <h2>Visi</h2>
                        <motion.p style={styles.visiText} >
                            “Menyiapkan Tenaga Terampil Menengah yang Siap Berkompetisi dan Siap Kerja”
                        </motion.p>
                    </motion.div>
                    <motion.div style={styles.misi} variants={itemVariants}>
                        <h2>Misi</h2>
                        <motion.div style={styles.misiText} >
                            <p>1. Menyiapkan lulusan yang siap mengisi pasaran kerja sesuai dengan bidang profesinya</p>
                            <p>2. Meningkatkan ketrampilan wirausaha</p>
                            <p>3. Menyiapkan ketrampilan sesuai jurusannya</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default VisiMisi;
