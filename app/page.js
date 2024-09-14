'use client'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, TextField, AppBar, Toolbar, Grid, Rating, Stack, Link, Avatar, IconButton } from '@mui/material';
import { firestore } from '@/firebase';
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Glassmorphism
const glassStyle = {
  bgcolor: 'rgba(61, 1, 101, 0.3)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  border: '2px solid rgba(255, 51, 255, 0.2)', // Thin border
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const contactRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 0,
  });

  const [waitlistCount, setWaitlistCount] = useState(0); // State for waitlist count

  // Fetch the waitlist count from Firebase
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Waitlist'));
        setWaitlistCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching waitlist count: ', error);
      }
    };

    fetchWaitlistCount();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, interest: newValue });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await setDoc(doc(collection(firestore, 'Waitlist')), formData);
      alert('Thank you for joining the waitlist!');
      setFormData({ name: '', email: '', interest: 0 }); // Reset form data
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding to waitlist. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(/assets/bg.png)', // Correct path if image is in public/assets
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Enhanced Header/NavBar */}
        <AppBar position="static" sx={{ ...glassStyle, height: '100px', display: 'flex', justifyContent: 'space-between' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {/* Logo on the left */}
            <Typography>
              <img src="/assets/horilogo-onyx.png" alt="Onyx Logo" style={{ height: '80px' }} />
            </Typography>

            {/* Navigation buttons on the right */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button sx={{ color: 'white' }} onClick={scrollToContact}>Contact</Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            mt: '70px', // Add margin-top equal to the height of the AppBar to prevent overlap
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              width: '100%',
              maxWidth: 1400,
              display: 'flex',
              justifyContent: 'space-between', // Better content distribution
            }}
          >
            {/* About Section */}
            <Grid item xs={12} md={6} lg={7}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start', // Aligns content to the left
                  justifyContent: 'center',
                  textAlign: 'left', // Aligns text to the left
                  p: 3, // Padding around the content for better spacing
                  borderRadius: '10px',
                }}
              >
                {/* Main Heading */}
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    color: '#fff',
                    textShadow: '1px 1px 8px rgba(0, 0, 0, 0.4)', // Subtle text shadow
                  }}
                >
                  For xx,
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    mb: 2,
                    color: '#ff7dd6',
                    textShadow: '1px 1px 8px rgba(0, 0, 0, 0.4)', // Subtle text shadow
                  }}
                >
                  By xx chromosomes.
                </Typography>

                {/* Description Text */}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.2rem',
                    lineHeight: 1.6,
                    maxWidth: '90%', // Restricts text width for a clean look
                  }}
                >
                  Onyx is transforming women’s safety with a community-focused app designed to connect and protect. Sign up for our waitlist and be among the first to experience seamless, supportive travel. Your safer journey starts here!
                </Typography>
                {/* Display the current waitlist count */}
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    color: '#ff7dd6',
                  }}
                >
                  Join {waitlistCount} others who are already looking out for eachother!
                </Typography>
              </Box>
            </Grid>

            {/* Waitlist Join Section */}
            <Grid item xs={12} md={6} lg={5}>
              <Box
                sx={{
                  ...glassStyle,
                  p: 4,
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Join the Onyx Waitlist
                </Typography>

                {/* Form Fields */}
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    mb: 2,
                    input: { color: 'white' },
                    label: { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ff85c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff69b4',
                      },
                    },
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    input: { color: 'white' },
                    label: { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ff85c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff69b4',
                      },
                    },
                  }}
                />

                {/* Star Rating Component */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Typography sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.7)' }}>Interest Rating:</Typography>
                  <Rating
                    name="interest-rating"
                    value={formData.interest}
                    onChange={handleRatingChange}
                    precision={1}
                    size="large"
                  />
                </Box>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: '#ff69b4', // Pink highlight
                    '&:hover': { bgcolor: '#ff85c0' },
                    mt: 3,
                    fontWeight: 'bold',
                  }}
                >
                  Join Waitlist
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* YouTube Video Section */}
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            mt: 4,
          }}
        >
          <Typography variant="h4" sx={{ color: '#ff7dd6',mb: 4, fontWeight: '600' }}>Empowering Women with Onyx</Typography>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '0',
              paddingTop: '56.25%', // 16:9 Aspect Ratio
              borderRadius: '50px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/XWXoJ7Twfcs?si=3lBFqMeLuLI-Nokk"
              title="Onyx Introduction Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </Box>
        </Box>

        {/* Contact Section */}
        <Box
          ref={contactRef}
          sx={{
            ...glassStyle,
            p: 4,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: '#ff7dd6', mb: 2, fontWeight: 'bold' }}>Get in Touch</Typography>
          <Stack direction="row" spacing={4} justifyContent="center">
              {/* Profile Pictures */}
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src="/assets/ypfp.jpeg"
                  alt="Yeshaswi Prakash"
                  sx={{ width: 100, height: 100, mb: 1, border: '2px solid #fff' }}
                />
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Link href="https://www.instagram.com/chowshiiii/" target="_blank" color="inherit">
                    <InstagramIcon sx={{ color: '#fff' }} />
                  </Link>
                  <Link href="https://www.linkedin.com/in/yeshaswiprakash/" target="_blank" color="inherit">
                    <LinkedInIcon sx={{ color: '#fff' }} />
                  </Link>
                  <Link href="mailto:npyeshaswi@gmail.com" target="_blank" color="inherit">
                    <EmailIcon sx={{ color: '#fff' }} />
                  </Link>
                </Stack>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src="/assets/gpfp.jpg"
                  alt="Gayathri J"
                  sx={{ width: 100, height: 100, mb: 1, border: '2px solid #fff' }}
                />
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Link href="https://www.instagram.com/gaya7hr1/" target="_blank" color="inherit">
                    <InstagramIcon sx={{ color: '#fff' }} />
                  </Link>
                  <Link href="https://www.linkedin.com/in/imgaya3" target="_blank" color="inherit">
                    <LinkedInIcon sx={{ color: '#fff' }} />
                  </Link>
                  <Link href="mailto:j.gayathri220504@gmail.com" target="_blank" color="inherit">
                    <EmailIcon sx={{ color: '#fff' }} />
                  </Link>
                </Stack>
              </Box>
            </Stack>
          <Typography>Feel free to reach out for more information!</Typography>
        </Box>

         {/* Go Back to Top Button */}
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32, // Increase space from the bottom
            right: 32,  // Increase space from the right
            bgcolor: '#ff69b4', // Customize as needed
            '&:hover': {
              bgcolor: '#ff85c0', // Customize as needed
            },
            color: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: 64, // Set a larger width
            height: 64, // Set a larger height
            padding: 2, // Add padding if necessary
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: 36 }} /> {/* Increase the icon size */}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}
