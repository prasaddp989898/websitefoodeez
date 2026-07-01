import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Store, ShieldCheck, UtensilsCrossed, ArrowRight, CheckCircle2 } from "lucide-react";

function RestaurantOnboarding() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email: initialEmail, authToken: initialToken } = location.state || {};

  // ============ CORE STATE ============
  const [authToken, setAuthToken] = useState(
    initialToken || localStorage.getItem("authToken") || "",
  );
  const [email, setEmail] = useState(initialEmail || "");
  const [restaurantId, setRestaurantId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fraudWarning, setFraudWarning] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [attemptedStep1, setAttemptedStep1] = useState(false);
  const [attemptedStep2, setAttemptedStep2] = useState(false);
  const [attemptedStep3, setAttemptedStep3] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // ============ FORM STATES ============
  const [step1Data, setStep1Data] = useState({
    name: "",
    ownerName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    leadSource: "",
    legalEntity: "",
  });

  const [step2Data, setStep2Data] = useState({
    gstNumber: "",
    gstExpiryDate: "",
    fssaiNumber: "",
    fssaiExpiryDate: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountNumberConfirm: "",
    bankAccountHolderName: "",
    accountType: "SAVINGS",
    ifscCode: "",
    panNumber: "",
    gstDocumentBase64: "",
    fssaiDocumentBase64: "",
    bankDocumentBase64: "",
    panDocumentBase64: "",
    frontPhotoBase64: "",
    gstPresent: "no",
  });
  const [gstDocumentFile, setGstDocumentFile] = useState(null);
  const [fssaiDocumentFile, setFssaiDocumentFile] = useState(null);
  const [panDocumentFile, setPanDocumentFile] = useState(null);
  const [bankDocumentFile, setBankDocumentFile] = useState(null);

  const [step3Data, setStep3Data] = useState({
    referralName: "",
    brandDescription: "",
    cuisineTags: "",
    serviceRadiusKm: "",
    storePhotos: [],
    storePhotosBase64: [],
    coverPhotoBase64: "",
    menuImageBase64: "",
  });

  // ============ OTHER STATES ============
  const [geoStatus, setGeoStatus] = useState("idle");
  const [panVerifyStatus, setPanVerifyStatus] = useState("idle");
  const [panVerifyMessage, setPanVerifyMessage] = useState("");
  const [panVerifiedName, setPanVerifiedName] = useState("");
  const [panDob, setPanDob] = useState("");

  const [menuMode, setMenuMode] = useState("upload");
  const [menuFile, setMenuFile] = useState(null);
  const [menuPreview, setMenuPreview] = useState(null);
  const [menuScanStatus, setMenuScanStatus] = useState("idle");
  const [menuScanError, setMenuScanError] = useState("");
  const [menuExtracted, setMenuExtracted] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingPrice, setEditingPrice] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [manualCatDraft, setManualCatDraft] = useState("");
  const [manualItemDraft, setManualItemDraft] = useState({ name: "", price: "" });

  // ============ CONSTANTS ============
  const apiBasePath = "/api/v1/restaurants";
  const MENU_SCAN_ACCEPT = "image/*,.pdf,.xlsx,.xls,.csv";
  const MENU_SCAN_MAX = 25 * 1024 * 1024;

  // ============ HELPERS ============
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  });

  const normalizeEmail = (email) => email?.trim().toLowerCase() ?? "";
  const normalizePhone = (phone) => (phone ? phone.replace(/\D/g, "") : "");

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateGSTIN = (gstin) =>
    /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(gstin);
  const validateFSSAI = (fssai) => /^\d{14}$/.test(fssai);
  const validatePAN = (pan) =>
    /^[A-Z]{5}\d{4}[A-Z]$/.test((pan || "").toUpperCase());
  const validateIFSC = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  const validateZipCode = (zip) => /^\d{6}$/.test(zip);

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isValidFutureDate = (dateValue) => {
    return dateValue && dateValue >= getTodayDateString();
  };

  const touchField = (field) =>
    setTouchedFields((prev) => ({ ...prev, [field]: true }));

  const validateStep1 = () => {
    const errors = {};
    if (!step1Data.name.trim()) {
      errors.name = "Restaurant name is required.";
    }
    if (!step1Data.legalEntity.trim()) {
      errors.legalEntity = "Legal entity name is required.";
    }
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!step1Data.ownerName.trim()) {
      errors.ownerName = "Owner name is required.";
    }
    if (!step1Data.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!validatePhone(step1Data.phone)) {
      errors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!step1Data.address.trim()) {
      errors.address = "Address is required.";
    }
    if (!step1Data.city.trim()) {
      errors.city = "City is required.";
    }
    if (!step1Data.state.trim()) {
      errors.state = "State is required.";
    }
    if (!step1Data.zipCode.trim()) {
      errors.zipCode = "Zip code is required.";
    } else if (!validateZipCode(step1Data.zipCode)) {
      errors.zipCode = "Enter a valid 6-digit zip code.";
    }
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    if (step2Data.gstPresent === "yes") {
      if (!step2Data.gstNumber.trim()) {
        errors.gstNumber = "GST number is required.";
      } else if (!validateGSTIN(step2Data.gstNumber)) {
        errors.gstNumber = "Enter a valid GSTIN.";
      }
    }
    if (!step2Data.fssaiNumber.trim()) {
      errors.fssaiNumber = "FSSAI number is required.";
    } else if (!validateFSSAI(step2Data.fssaiNumber)) {
      errors.fssaiNumber = "Enter a valid 14-digit FSSAI number.";
    }
    if (!step2Data.fssaiDocumentBase64) {
      errors.fssaiDocumentBase64 = "FSSAI document is required.";
    }
    if (!step2Data.panNumber.trim()) {
      errors.panNumber = "PAN number is required.";
    } else if (!validatePAN(step2Data.panNumber)) {
      errors.panNumber = "Enter a valid 10-character PAN.";
    }
    if (!step2Data.panDocumentBase64) {
      errors.panDocumentBase64 = "PAN document is required.";
    }
    if (step2Data.gstPresent === "yes") {
      if (!step2Data.gstExpiryDate) {
        errors.gstExpiryDate = "GST expiry date is required.";
      } else if (!isValidFutureDate(step2Data.gstExpiryDate)) {
        errors.gstExpiryDate = "Please select a valid future date.";
      }
    }
    if (!step2Data.fssaiExpiryDate) {
      errors.fssaiExpiryDate = "FSSAI expiry date is required.";
    } else if (!isValidFutureDate(step2Data.fssaiExpiryDate)) {
      errors.fssaiExpiryDate = "Please select a valid future date.";
    }
    if (!step2Data.bankName.trim()) {
      errors.bankName = "Bank name is required.";
    }
    if (!step2Data.bankAccountNumber.trim()) {
      errors.bankAccountNumber = "Account number is required.";
    }
    if (!step2Data.bankAccountNumberConfirm.trim()) {
      errors.bankAccountNumberConfirm = "Confirm account number.";
    }
    if (
      step2Data.bankAccountNumber.trim() &&
      step2Data.bankAccountNumberConfirm.trim() &&
      step2Data.bankAccountNumber !== step2Data.bankAccountNumberConfirm
    ) {
      errors.bankAccountNumberConfirm = "Account numbers must match.";
    }
    if (!step2Data.bankAccountHolderName.trim()) {
      errors.bankAccountHolderName = "Account holder name is required.";
    }
    if (!step2Data.ifscCode.trim()) {
      errors.ifscCode = "IFSC code is required.";
    } else if (!validateIFSC(step2Data.ifscCode)) {
      errors.ifscCode = "Enter a valid IFSC code.";
    }
    if (!step2Data.bankDocumentBase64) {
      errors.bankDocumentBase64 = "Bank document is required.";
    }
    return errors;
  };

  function aggregateTotalItems() {
    return (
      menuExtracted?.reduce((sum, category) => sum + (category.items?.length || 0), 0) || 0
    );
  }

  const validateStep3 = () => {
    const errors = {};
    const cuisineTagsValue = step3Data.cuisineTags;
    const cuisineTagsEmpty =
      cuisineTagsValue == null ||
      (Array.isArray(cuisineTagsValue)
        ? cuisineTagsValue.length === 0
        : !cuisineTagsValue.toString().trim());
    if (cuisineTagsEmpty) {
      errors.cuisineTags = "Cuisine tags are required.";
    }

    const serviceRadiusRaw = (step3Data.serviceRadiusKm || "").toString();
    if (!serviceRadiusRaw.trim()) {
      errors.serviceRadiusKm = "Service radius is required.";
    } else if (Number(serviceRadiusRaw) <= 0) {
      errors.serviceRadiusKm = "Service radius must be greater than zero.";
    }

    if (!step3Data.menuImageBase64 && aggregateTotalItems() === 0) {
      errors.menuImageBase64 = "Please upload a menu or add at least one item.";
    }
    // Cover photo made optional per request — do not require it here.
    return errors;
  };

  const step1Errors = validateStep1();
  const step2Errors = validateStep2();
  const step3Errors = validateStep3();
  const isStep1Valid = Object.keys(step1Errors).length === 0;
  const isStep2Valid = Object.keys(step2Errors).length === 0;
  const isStep3Valid = Object.keys(step3Errors).length === 0;

  const showErrorFor = (field, step) => {
    const errors = step === 1 ? step1Errors : step === 2 ? step2Errors : step3Errors;
    const attempted = step === 1 ? attemptedStep1 : step === 2 ? attemptedStep2 : attemptedStep3;
    return (touchedFields[field] || attempted) ? errors[field] : "";
  };

  const handleContinueStep1 = async () => {
    setAttemptedStep1(true);
    setError("");
    if (!isStep1Valid) return;
    if (isSubmitting) return;

    setActiveStep(2);
  };

  const handleContinueStep2 = async () => {
    setAttemptedStep2(true);
    setError("");
    if (!isStep2Valid) return;
    if (isSubmitting) return;

    setActiveStep(3);
  };

  const handleCompleteRegistration = async () => {
    setAttemptedStep3(true);
    setError("");
    if (!isStep3Valid) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let currentRestaurantId = restaurantId;
      if (!currentRestaurantId) {
        const step1Result = await submitStep1();
        currentRestaurantId = step1Result?.restaurantId || step1Result?.id || restaurantId;
        if (!currentRestaurantId) {
          throw new Error("Restaurant creation failed. Missing restaurantId.");
        }
      }
      await submitStep2(currentRestaurantId);
      await submitStep3(currentRestaurantId);
      // Best-effort notify super admin and owner (server should handle emails)
      notifySuperAdminAndOwner(currentRestaurantId);
      setSuccess(true);
      setActiveStep(4);
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const detectFraud = (data) => {
    const freeDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];
    const emailDomain =
      normalizeEmail(data.email).split("@").pop()?.toLowerCase() ?? "";
    return (
      freeDomains.includes(emailDomain) || !data.latitude || !data.longitude
    );
  };

  const calculateRiskScore = (data, suspicious) => { 
    let score = 0;
    if (suspicious) score += 0.5;
    if (!data.latitude || !data.longitude) score += 0.2;
    if (data.email?.includes("gmail.com") || data.email?.includes("yahoo.com"))
      score += 0.2;
    if (!data.gstNumber || !data.fssaiNumber) score += 0.1;
    return Math.min(score, 1);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const normalizeText = (text) => (text || "").toString().trim().toLowerCase();

  const normalizeMenuExtractedCategories = (categories) => {
    const categoryMap = new Map();

    categories?.forEach((category) => {
      const rawCategoryName = category?.name?.toString().trim() || "Uncategorized";
      const categoryKey = normalizeText(rawCategoryName) || "__uncategorized__";
      const items = Array.isArray(category?.items) ? category.items : [];
      const itemNameSet = categoryMap.has(categoryKey)
        ? categoryMap.get(categoryKey).itemNameSet
        : new Set();

      const uniqueItems = items.reduce((acc, item) => {
        const itemName = (item?.name || item?.title || "").toString().trim();
        const itemKey = normalizeText(itemName);
        if (!itemName || itemNameSet.has(itemKey)) return acc;
        itemNameSet.add(itemKey);
        acc.push({ ...item, name: itemName });
        return acc;
      }, []);

      if (!uniqueItems.length) return;

      if (categoryMap.has(categoryKey)) {
        categoryMap.get(categoryKey).category.items.push(...uniqueItems);
      } else {
        categoryMap.set(categoryKey, {
          category: { ...category, name: rawCategoryName, items: uniqueItems },
          itemNameSet,
        });
      }
    });

    return Array.from(categoryMap.values()).map((entry) => ({
      ...entry.category,
      items: entry.category.items,
    }));
  };

  const compressImage = (file, maxPx = 1600, quality = 0.82) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (width > maxPx || height > maxPx) {
          const ratio = Math.min(maxPx / width, maxPx / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleAutoCapture = () => {
    if (!navigator.geolocation) return setGeoStatus("error");
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStep1Data((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setGeoStatus("idle");
      },
      () => setGeoStatus("error"),
    );
  };

  const handleVerifyPan = async () => {
    const pan = step2Data.panNumber.trim().toUpperCase();
    if (!validatePAN(pan)) {
      setPanVerifyMessage("Enter a valid 10-character PAN");
      setPanVerifyStatus("failed");
      return;
    }
    setPanVerifyStatus("verifying");
    try {
      const res = await fetch(`${apiBasePath}/verify-pan`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          pan,
          dateOfBirth: panDob
            ? panDob.split("-").reverse().join("/")
            : undefined,
        }),
      });
      const result = await res.json();
      if (result?.valid) {
        setPanVerifiedName(result.name || "");
        setPanVerifyMessage("PAN verified successfully");
        setPanVerifyStatus("success");
      } else {
        setPanVerifyMessage(result?.message || "PAN verification failed");
        setPanVerifyStatus("failed");
      }
    } catch {
      setPanVerifyMessage("Verification service unavailable");
      setPanVerifyStatus("failed");
    }
  };

  const isMenuImage = (f) => f?.type?.startsWith("image/");

  const handleMenuFile = (file) => {
    if (!file || file.size > MENU_SCAN_MAX) {
      setMenuScanError(file ? "File too large" : "");
      return;
    }
    setMenuFile(file);
    setMenuPreview(isMenuImage(file) ? URL.createObjectURL(file) : null);
    setMenuScanError("");
  };

  const handleMenuScan = async () => {
    if (!menuFile) return;
    setMenuScanStatus("scanning");
    try {
      let base64;
      if (isMenuImage(menuFile)) {
        const compressed = await compressImage(menuFile);
        base64 = compressed.split(",")[1];
      } else {
        const b64Data = await fileToBase64(menuFile);
        base64 = b64Data.split(",")[1];
      }
      setStep3Data((prev) => ({ ...prev, menuImageBase64: base64 }));

      const res = await fetch(`/api/v1/menu-scan`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ imageBase64: base64, mimeType: menuFile.type }),
      });
      const result = await res.json();
      setMenuExtracted(normalizeMenuExtractedCategories(result.categories || []));
    } catch {
      setMenuScanError("Menu extraction failed");
    } finally {
      setMenuScanStatus("idle");
    }
  };

  const toggleCategoryExpanded = (index) => {
    setExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((value) => value !== index) : [...prev, index],
    );
  };

  const startEditingMenuItem = (categoryIndex, itemIndex) => {
    const category = menuExtracted?.[categoryIndex];
    const item = category?.items?.[itemIndex] || {};
    setEditingItem({ categoryIndex, itemIndex });
    setEditingName(item.name || item.title || "");
    setEditingPrice(item.price?.toString() ?? "");
    setEditingCategory(category?.name || "");
  };

  const cancelEditMenuItem = () => {
    setEditingItem(null);
    setEditingName("");
    setEditingPrice("");
    setEditingCategory("");
  };

  const saveEditedMenuItem = () => {
    if (!editingItem || !menuExtracted) return;

    setMenuExtracted((prev) => {
      const next = prev ? [...prev] : [];
      const { categoryIndex, itemIndex } = editingItem;
      const currentCategory = next[categoryIndex];
      if (!currentCategory) return prev;
      const currentItem = currentCategory.items?.[itemIndex];
      if (!currentItem) return prev;

      const updatedItem = {
        ...currentItem,
        name: editingName.trim() || currentItem.name || currentItem.title || "Unnamed item",
        price: editingPrice.trim() || currentItem.price || "",
      };
      const targetCategoryName = editingCategory.trim() || currentCategory.name || "Uncategorized";

      if (targetCategoryName === currentCategory.name) {
        const updatedItems = currentCategory.items.map((item, idx) =>
          idx === itemIndex ? updatedItem : item,
        );
        next[categoryIndex] = { ...currentCategory, items: updatedItems };
      } else {
        // Remove from original category
        const remainingItems = currentCategory.items.filter((_, idx) => idx !== itemIndex);
        next[categoryIndex] = { ...currentCategory, items: remainingItems };

        // Find or create target category
        const existingCategoryIndex = next.findIndex(
          (category) => category.name?.toLowerCase() === targetCategoryName.toLowerCase(),
        );
        if (existingCategoryIndex >= 0) {
          const targetCategory = next[existingCategoryIndex];
          next[existingCategoryIndex] = {
            ...targetCategory,
            items: [...(targetCategory.items || []), updatedItem],
          };
        } else {
          next.push({ name: targetCategoryName, items: [updatedItem] });
        }
      }

      cancelEditMenuItem();
      return next.filter((category) => category.items && category.items.length > 0);
    });
  };

  const getDisplayPrice = (price) => {
    if (price === null || price === undefined || price === "") {
      return "Price Not Detected";
    }
    const trimmed = price.toString().trim();
    if (!trimmed) return "Price Not Detected";
    return trimmed.startsWith("₹") ? trimmed : `₹${trimmed}`;
  };

  const submitStep1 = async () => {
    // Step1 must create the restaurant and return an id
    if (
      !step1Data.name.trim() ||
      !step1Data.ownerName.trim() ||
      !validatePhone(step1Data.phone)
    ) {
      throw new Error("Please fill all required Restaurant Details");
    }

    const payload = {
      name: step1Data.name.trim(),
      ownerName: step1Data.ownerName.trim(),
      phone: normalizePhone(step1Data.phone),
      address: step1Data.address?.trim(),
      city: step1Data.city?.trim(),
      state: step1Data.state?.trim(),
      zipCode: step1Data.zipCode?.trim(),
      latitude: step1Data.latitude,
      longitude: step1Data.longitude,
      leadSource: step1Data.leadSource,
      legalEntity: step1Data.legalEntity,
      email: normalizeEmail(email),
    };

    try {
      const res = await fetch(`${apiBasePath}/register/step1`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Step 1 failed");

      // set restaurantId from result
      const id = result?.id || result?.restaurantId;
      if (id) {
        setRestaurantId(id);
      }

      // Preserve token if returned in multiple shapes
      const token = result?.token || result?.data?.token || result?.accessToken;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
      }

      // Fraud / risk checks
      const suspicious = detectFraud({
        ...payload,
        gstNumber: step2Data.gstNumber,
        fssaiNumber: step2Data.fssaiNumber,
      });
      setFraudWarning(suspicious ? "Potential risk detected — please review." : "");
      setRiskScore(calculateRiskScore(payload, suspicious));

      return result;
    } catch (err) {
      throw err;
    }
  };

  const submitStep2 = async (currentRestaurantId) => {
    const id = currentRestaurantId || restaurantId;
    if (!id) throw new Error("Missing restaurantId for Step 2");

    const payload = {
      fssaiNumber: step2Data.fssaiNumber,
      fssaiExpiryDate: step2Data.fssaiExpiryDate,
      panNumber: step2Data.panNumber?.trim()?.toUpperCase(),
      bankName: step2Data.bankName,
      accountType: step2Data.accountType,
      bankAccountNumber: step2Data.bankAccountNumber,
      bankAccountHolderName: step2Data.bankAccountHolderName,
      ifscCode: step2Data.ifscCode?.toUpperCase(),
      ...(step2Data.gstPresent === "yes" && {
        gstNumber: step2Data.gstNumber?.trim()?.toUpperCase(),
        ...(step2Data.gstExpiryDate ? { gstExpiryDate: step2Data.gstExpiryDate } : {}),
      }),
    };

    const endpoint = `${apiBasePath}/${id}/register/step2`;
    try {
      console.debug("submitStep2: endpoint", endpoint, "headers:", getAuthHeaders());
      const res = await fetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.status === 403) {
        console.warn("Step2 403 response:", result);
        throw new Error(result?.message || "Access denied for Step 2");
      }
      if (!res.ok) throw new Error(result?.message || "Step 2 failed");

      const token = result?.token || result?.data?.token || result?.accessToken;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
      }

      await uploadRegistrationDocuments(id);

      return result;
    } catch (err) {
      console.error("submitStep2 error:", err);
      throw err;
    }
  };

  const uploadRegistrationDocument = async (restaurantId, type, file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);

    const endpoint = `${apiBasePath}/${restaurantId}/documents/registration`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const result = await res.json().catch(() => null);
      throw new Error(result?.message || `Failed to upload ${type} document`);
    }

    return res.json();
  };

  const uploadRegistrationDocuments = async (restaurantId) => {
    const uploadedDocuments = [];

    if (panDocumentFile) {
      uploadedDocuments.push(await uploadRegistrationDocument(restaurantId, "PAN", panDocumentFile));
    }
    if (fssaiDocumentFile) {
      uploadedDocuments.push(await uploadRegistrationDocument(restaurantId, "FSSAI", fssaiDocumentFile));
    }
    if (bankDocumentFile) {
      uploadedDocuments.push(await uploadRegistrationDocument(restaurantId, "BANK", bankDocumentFile));
    }
    if (step2Data.gstPresent === "yes" && gstDocumentFile) {
      uploadedDocuments.push(await uploadRegistrationDocument(restaurantId, "GST", gstDocumentFile));
    }

    return uploadedDocuments;
  };

  const submitStep3 = async (currentRestaurantId) => {
    const id = currentRestaurantId || restaurantId;
    if (!id) throw new Error("Missing restaurantId for Step 3");

    const cuisineTagsArray = (step3Data.cuisineTags || "")
      .toString()
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const menuItems = (menuExtracted || []).flatMap((cat) =>
      (cat.items || []).map((item) => ({
        name: item.name || item.title || "",
        price: item.price || item.priceDisplay || "",
        category: cat.name || "Uncategorized",
      })),
    );

    const payload = {
      referralName: step3Data.referralName,
      brandDescription: step3Data.brandDescription,
      cuisineTags: cuisineTagsArray,
      serviceRadiusKm: Number(step3Data.serviceRadiusKm) || step3Data.serviceRadiusKm,
      coverPhotoBase64: step3Data.coverPhotoBase64 || undefined,
      menuImageBase64: step3Data.menuImageBase64 || undefined,
      menuItems: menuItems.length ? menuItems : undefined,
    };

    const endpoint = `${apiBasePath}/${id}/register/step3/extract`;
    try {
      console.debug("submitStep3: endpoint", endpoint, "headers:", getAuthHeaders());
      const res = await fetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.status === 403) {
        console.warn("Step3 403 response:", result);
        throw new Error(result?.message || "Access denied for Step 3");
      }
      if (res.status === 400) {
        console.warn("Step3 400 response:", result);
        throw new Error(result?.message || "Invalid Step 3 payload");
      }
      if (!res.ok) throw new Error(result?.message || "Step 3 failed");

      const token = result?.token || result?.data?.token || result?.accessToken;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
      }

      return result;
    } catch (err) {
      console.error("submitStep3 error:", err);
      throw err;
    }
  };

  const notifySuperAdminAndOwner = async (currentRestaurantId) => {
    const id = currentRestaurantId || restaurantId;
    if (!id) return;
    try {
      const endpoint = `${apiBasePath}/${id}/notify`;
      console.debug("notify: endpoint", endpoint);
      await fetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ restaurantId: id, email: normalizeEmail(email) }),
      });
    } catch (err) {
      console.warn("notifySuperAdminAndOwner failed", err);
    }
  };

  if (success || activeStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Your registration is completed .
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your restaurant onboarding has been completed. Our team will review your details and contact you shortly.
          </p>
          <button
            onClick={() => navigate("/partner-with-us")}
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#C89A31] px-8 py-3 text-white text-base font-semibold hover:bg-[#b6871f]"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase text-[#C89A31] tracking-[0.24em]">
            Restaurant Onboarding
          </p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Complete Restaurant Onboarding
          </h1>
          <p className="text-gray-600 mt-3">
            Follow the steps below to complete your onboarding in three simple stages.
          </p>
        </div>

        <div className="mb-8 rounded-3xl bg-white p-6 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            {[
              { step: 1, label: "Restaurant" },
              { step: 2, label: "Compliance" },
              { step: 3, label: "Menu" },
            ].map((item) => {
              const isActive = activeStep === item.step;
              const isComplete = activeStep > item.step;
              return (
                <div key={item.step} className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                      isComplete
                        ? "border-green-500 bg-green-50 text-green-700"
                        : isActive
                        ? "border-[#C89A31] bg-[#C89A31] text-white"
                        : "border-gray-200 bg-white text-gray-500"
                    }`}
                  >
                    {isComplete ? <CheckCircle2 className="h-5 w-5" /> : item.step}
                  </div>
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Step {item.step}</p>
                    <p className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 transition-all duration-300">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Step {activeStep} of 3</p>
              <h2 className="text-2xl font-semibold text-gray-900">
                {activeStep === 1
                  ? "Restaurant Details"
                  : activeStep === 2
                  ? "Compliance & Banking"
                  : "Menu & Branding"}
              </h2>
            </div>
            <div className="rounded-2xl bg-[#F7F5EC] px-4 py-2 text-sm text-[#7B5D02]">
              {activeStep === 1
                ? "Complete business details"
                : activeStep === 2
                ? "Upload compliance documents"
                : "Add branding and menu details"}
            </div>
          </div>

          {activeStep === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-sm block mb-1">
                    <div className="flex items-baseline justify-between">
                      <div>Legal Entity Name <span className="text-[#C89A31]">*</span></div>
                      <div className="text-xs text-stone-500">As per FSSAI</div>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={step1Data.legalEntity}
                    onChange={(e) =>
                      setStep1Data({ ...step1Data, legalEntity: e.target.value })
                    }
                    onBlur={() => touchField("legalEntity")}
                    placeholder="Enter legal entity name"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("legalEntity", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("legalEntity", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("legalEntity", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Restaurant Name <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step1Data.name}
                    onChange={(e) =>
                      setStep1Data({ ...step1Data, name: e.target.value })
                    }
                    onBlur={() => touchField("name")}
                    placeholder="Enter restaurant name"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("name", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("name", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("name", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Owner Name <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step1Data.ownerName}
                    onChange={(e) =>
                      setStep1Data({ ...step1Data, ownerName: e.target.value })
                    }
                    onBlur={() => touchField("ownerName")}
                    placeholder="Enter owner name"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("ownerName", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("ownerName", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("ownerName", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Email <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => touchField("email")}
                    placeholder="Enter email address"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("email", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("email", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("email", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Phone Number <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={step1Data.phone}
                    onChange={(e) =>
                      setStep1Data({
                        ...step1Data,
                        phone: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    onBlur={() => touchField("phone")}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("phone", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("phone", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("phone", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    <div className="flex items-baseline justify-between">
                      <div>Address <span className="text-[#C89A31]">*</span></div>
                      <div className="text-xs text-stone-500">As per FSSAI</div>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={step1Data.address}
                    onChange={(e) =>
                      setStep1Data({ ...step1Data, address: e.target.value })
                    }
                    onBlur={() => touchField("address")}
                    placeholder="Enter full address"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("address", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("address", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("address", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    City <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step1Data.city}
                    onChange={(e) =>
                      setStep1Data({ ...step1Data, city: e.target.value })
                    }
                    onBlur={() => touchField("city")}
                    placeholder="City"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("city", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("city", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("city", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    State <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step1Data.state}
                    onChange={(e) =>
                      setStep1Data({ ...step1Data, state: e.target.value })
                    }
                    onBlur={() => touchField("state")}
                    placeholder="State"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("state", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("state", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("state", 1)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Zip Code <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step1Data.zipCode}
                    onChange={(e) =>
                      setStep1Data({
                        ...step1Data,
                        zipCode: e.target.value.replace(/\D/g, "").slice(0, 6),
                      })
                    }
                    onBlur={() => touchField("zipCode")}
                    placeholder="Enter 6-digit zip code"
                    maxLength={6}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("zipCode", 1)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("zipCode", 1) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("zipCode", 1)}</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold mb-2">📍 Location Coordinates</p>
                    <p className="text-sm text-gray-500">
                      Capture latitude and longitude to improve your listing accuracy.
                    </p>
                  </div>
                  <button
                    onClick={handleAutoCapture}
                    disabled={geoStatus === "loading"}
                    className={`rounded-2xl px-6 py-3 font-medium transition ${
                      geoStatus === "loading"
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : geoStatus === "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-[#C89A31] text-white hover:bg-[#b6871f]"
                    }`}
                  >
                    {geoStatus === "loading"
                      ? "Capturing..."
                      : geoStatus === "error"
                      ? "Location access denied"
                      : "Auto-capture from browser"}
                  </button>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-medium text-sm block mb-1">Latitude</label>
                    <input
                      type="text"
                      value={step1Data.latitude}
                      onChange={(e) =>
                        setStep1Data({ ...step1Data, latitude: e.target.value })
                      }
                      placeholder="Auto-captured"
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C89A31] bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm block mb-1">Longitude</label>
                    <input
                      type="text"
                      value={step1Data.longitude}
                      onChange={(e) =>
                        setStep1Data({ ...step1Data, longitude: e.target.value })
                      }
                      placeholder="Auto-captured"
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C89A31] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-sm block mb-1">
                    GST Present
                  </label>
                  <select
                    value={step2Data.gstPresent}
                    onChange={(e) =>
                      setStep2Data({ ...step2Data, gstPresent: e.target.value })
                    }
                    onBlur={() => touchField("gstPresent")}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                {step2Data.gstPresent === "yes" && (
                  <>
                    <div>
                      <label className="font-medium text-sm block mb-1">
                        GST Number
                      </label>
                      <input
                        type="text"
                        value={step2Data.gstNumber}
                        onChange={(e) =>
                          setStep2Data({
                            ...step2Data,
                            gstNumber: e.target.value.toUpperCase(),
                          })
                        }
                        onBlur={() => touchField("gstNumber")}
                        placeholder="e.g., 27AABCT1234H1Z0"
                        className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                          showErrorFor("gstNumber", 2)
                            ? "border-red-400 focus:border-red-500"
                            : "border-gray-200 focus:border-[#C89A31]"
                        }`}
                      />
                      {showErrorFor("gstNumber", 2) && (
                        <p className="mt-2 text-sm text-red-600">{showErrorFor("gstNumber", 2)}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-medium text-sm block mb-1">
                        GST Expiry Date
                      </label>
                      <input
                        type="date"
                        min={getTodayDateString()}
                        value={step2Data.gstExpiryDate}
                        onChange={(e) =>
                          setStep2Data({
                            ...step2Data,
                            gstExpiryDate: e.target.value,
                          })
                        }
                        onBlur={() => touchField("gstExpiryDate")}
                        className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                          showErrorFor("gstExpiryDate", 2)
                            ? "border-red-400 focus:border-red-500"
                            : "border-gray-200 focus:border-[#C89A31]"
                        }`}
                      />
                      {showErrorFor("gstExpiryDate", 2) && (
                        <p className="mt-2 text-sm text-red-600">
                          {showErrorFor("gstExpiryDate", 2)}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-medium text-sm block mb-1">
                        GST Document
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setGstDocumentFile(file);
                            fileToBase64(file).then((base64) => {
                              setStep2Data({
                                ...step2Data,
                                gstDocumentBase64: base64,
                              });
                            });
                          }
                        }}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-sm block mb-1">
                    FSSAI Number <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.fssaiNumber}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        fssaiNumber: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    onBlur={() => touchField("fssaiNumber")}
                    placeholder="14-digit FSSAI number"
                    maxLength={14}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("fssaiNumber", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("fssaiNumber", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("fssaiNumber", 2)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    FSSAI Expiry Date <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="date"
                    min={getTodayDateString()}
                    value={step2Data.fssaiExpiryDate}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        fssaiExpiryDate: e.target.value,
                      })
                    }
                    onBlur={() => touchField("fssaiExpiryDate")}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("fssaiExpiryDate", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("fssaiExpiryDate", 2) && (
                    <p className="mt-2 text-sm text-red-600">
                      {showErrorFor("fssaiExpiryDate", 2)}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="font-medium text-sm block mb-1">
                    FSSAI Document <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFssaiDocumentFile(file);
                        fileToBase64(file).then((base64) => {
                          setStep2Data({
                            ...step2Data,
                            fssaiDocumentBase64: base64,
                          });
                        });
                      }
                    }}
                    className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-[#C89A31]"
                  />
                  {showErrorFor("fssaiDocumentBase64", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("fssaiDocumentBase64", 2)}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-sm block mb-1">
                    PAN Number <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.panNumber}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        panNumber: e.target.value.toUpperCase(),
                      })
                    }
                    onBlur={() => touchField("panNumber")}
                    placeholder="e.g., AAAPL5055K"
                    maxLength={10}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("panNumber", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("panNumber", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("panNumber", 2)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    value={panDob}
                    onChange={(e) => setPanDob(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    onClick={handleVerifyPan}
                    disabled={!step2Data.panNumber || panVerifyStatus === "verifying"}
                    className="w-full rounded-2xl bg-[#C89A31] py-3 text-white transition hover:bg-[#b6871f] disabled:bg-gray-400"
                  >
                    {panVerifyStatus === "verifying" ? "Verifying..." : "Verify PAN"}
                  </button>
                </div>
                <div className="md:col-span-2">
                  <label className="font-medium text-sm block mb-1">
                    PAN Document <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPanDocumentFile(file);
                        fileToBase64(file).then((base64) => {
                          setStep2Data({
                            ...step2Data,
                            panDocumentBase64: base64,
                          });
                        });
                      }
                    }}
                    className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-[#C89A31]"
                  />
                  {showErrorFor("panDocumentBase64", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("panDocumentBase64", 2)}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Bank Name <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.bankName}
                    onChange={(e) =>
                      setStep2Data({ ...step2Data, bankName: e.target.value })
                    }
                    onBlur={() => touchField("bankName")}
                    placeholder="e.g., HDFC Bank, ICICI Bank"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("bankName", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("bankName", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("bankName", 2)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Account Type <span className="text-[#C89A31]">*</span>
                  </label>
                  <select
                    value={step2Data.accountType}
                    onChange={(e) =>
                      setStep2Data({ ...step2Data, accountType: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                  >
                    <option value="SAVINGS">Savings</option>
                    <option value="CURRENT">Current</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Account Number <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.bankAccountNumber}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        bankAccountNumber: e.target.value,
                      })
                    }
                    onBlur={() => touchField("bankAccountNumber")}
                    placeholder="Bank account number"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("bankAccountNumber", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("bankAccountNumber", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("bankAccountNumber", 2)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Confirm Account Number <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.bankAccountNumberConfirm}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        bankAccountNumberConfirm: e.target.value,
                      })
                    }
                    onBlur={() => touchField("bankAccountNumberConfirm")}
                    placeholder="Confirm account number"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("bankAccountNumberConfirm", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("bankAccountNumberConfirm", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("bankAccountNumberConfirm", 2)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Account Holder Name <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.bankAccountHolderName}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        bankAccountHolderName: e.target.value,
                      })
                    }
                    onBlur={() => touchField("bankAccountHolderName")}
                    placeholder="Name as per bank account"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("bankAccountHolderName", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("bankAccountHolderName", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("bankAccountHolderName", 2)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    IFSC Code <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2Data.ifscCode}
                    onChange={(e) =>
                      setStep2Data({
                        ...step2Data,
                        ifscCode: e.target.value.toUpperCase(),
                      })
                    }
                    onBlur={() => touchField("ifscCode")}
                    placeholder="e.g., HDFC0000001"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("ifscCode", 2)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("ifscCode", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("ifscCode", 2)}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="font-medium text-sm block mb-1">
                    Bank Document <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setBankDocumentFile(file);
                        fileToBase64(file).then((base64) => {
                          setStep2Data({
                            ...step2Data,
                            bankDocumentBase64: base64,
                          });
                        });
                      }
                    }}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none focus:border-[#C89A31] ${
                      showErrorFor("bankDocumentBase64", 2)
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  />
                  {showErrorFor("bankDocumentBase64", 2) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("bankDocumentBase64", 2)}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Cuisine Tags <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="text"
                    value={step3Data.cuisineTags}
                    onChange={(e) =>
                      setStep3Data({ ...step3Data, cuisineTags: e.target.value })
                    }
                    onBlur={() => touchField("cuisineTags")}
                    placeholder="e.g., North Indian, Mughlai, Biryani"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("cuisineTags", 3)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("cuisineTags", 3) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("cuisineTags", 3)}</p>
                  )}
                </div>
                <div>
                  <label className="font-medium text-sm block mb-1">
                    Service Radius (km) <span className="text-[#C89A31]">*</span>
                  </label>
                  <input
                    type="number"
                    value={step3Data.serviceRadiusKm}
                    onChange={(e) =>
                      setStep3Data({
                        ...step3Data,
                        serviceRadiusKm: e.target.value,
                      })
                    }
                    onBlur={() => touchField("serviceRadiusKm")}
                    placeholder="e.g., 5"
                    min="0"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                      showErrorFor("serviceRadiusKm", 3)
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#C89A31]"
                    }`}
                  />
                  {showErrorFor("serviceRadiusKm", 3) && (
                    <p className="mt-2 text-sm text-red-600">{showErrorFor("serviceRadiusKm", 3)}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="font-medium text-sm block mb-1">
                    Brand Description
                  </label>
                  <textarea
                    value={step3Data.brandDescription}
                    onChange={(e) =>
                      setStep3Data({
                        ...step3Data,
                        brandDescription: e.target.value,
                      })
                    }
                    placeholder="Tell us about your restaurant..."
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-medium text-sm block mb-1">
                    Referral Name <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={step3Data.referralName}
                    onChange={(e) =>
                      setStep3Data({
                        ...step3Data,
                        referralName: e.target.value,
                      })
                    }
                    placeholder="Who referred you to us?"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">📷 Cover Photo</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload a cover image to brand your restaurant profile.
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      compressImage(e.target.files[0]).then((base64) => {
                        setStep3Data({
                          ...step3Data,
                          coverPhotoBase64: base64,
                        });
                      });
                    }
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none focus:border-[#C89A31] ${
                    showErrorFor("coverPhotoBase64", 3)
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                />
                {showErrorFor("coverPhotoBase64", 3) && (
                  <p className="mt-2 text-sm text-red-600">{showErrorFor("coverPhotoBase64", 3)}</p>
                )}
                {step3Data.coverPhotoBase64 && (
                  <p className="mt-3 text-sm text-green-600">Cover photo added.</p>
                )}
              </div>

              <div className="rounded-3xl border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">📋 Menu</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload and scan your menu file so we can complete your onboarding faster.
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <button
                    type="button"
                    onClick={() => setMenuMode("upload")}
                    className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                      menuMode === "upload"
                        ? "bg-[#C89A31] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Upload Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuMode("manual")}
                    className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                      menuMode === "manual"
                        ? "bg-[#C89A31] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Add Manual
                  </button>
                </div>

                {menuMode === "upload" && (
                  <div className="mt-6 space-y-4">
                    <input
                      type="file"
                      accept={MENU_SCAN_ACCEPT}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleMenuFile(e.target.files[0]);
                        }
                      }}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none focus:border-[#C89A31] ${
                        showErrorFor("menuImageBase64", 3)
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />
                    {menuScanError && (
                      <p className="text-sm text-red-600">{menuScanError}</p>
                    )}
                    {menuPreview && (
                      <img
                        src={menuPreview}
                        alt="Menu preview"
                        className="mt-2 max-h-40 rounded-2xl"
                      />
                    )}
                    {menuFile && (
                      <button
                        onClick={handleMenuScan}
                        disabled={menuScanStatus === "scanning"}
                        className="rounded-2xl bg-[#C89A31] px-5 py-3 text-white hover:bg-[#b6871f] disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {menuScanStatus === "scanning" ? "Scanning..." : "Scan & Extract Menu"}
                      </button>
                    )}
                    {showErrorFor("menuImageBase64", 3) && (
                      <p className="text-sm text-red-600">{showErrorFor("menuImageBase64", 3)}</p>
                    )}
                  </div>
                )}
                {menuMode === "manual" && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={manualCatDraft}
                        onChange={(e) => setManualCatDraft(e.target.value)}
                        placeholder="Category"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                      />
                      <input
                        type="text"
                        value={manualItemDraft.name}
                        onChange={(e) =>
                          setManualItemDraft((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Item name"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                      />
                      <input
                        type="text"
                        value={manualItemDraft.price}
                        onChange={(e) =>
                          setManualItemDraft((prev) => ({ ...prev, price: e.target.value }))
                        }
                        placeholder="Price"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#C89A31]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const categoryName = manualCatDraft.trim() || "Uncategorized";
                        const itemName = manualItemDraft.name.trim();
                        if (!itemName) return;
                        const itemPrice = manualItemDraft.price.trim();
                        setMenuExtracted((prev) => {
                          const next = [...prev];
                          const existingIndex = next.findIndex(
                            (category) => normalizeText(category.name) === normalizeText(categoryName),
                          );
                          if (existingIndex >= 0) {
                            next[existingIndex] = {
                              ...next[existingIndex],
                              items: [
                                ...(next[existingIndex].items || []),
                                { name: itemName, price: itemPrice },
                              ],
                            };
                          } else {
                            next.push({
                              name: categoryName,
                              items: [{ name: itemName, price: itemPrice }],
                            });
                          }
                          return next;
                        });
                        setManualItemDraft({ name: "", price: "" });
                      }}
                      className="rounded-2xl bg-[#C89A31] px-5 py-3 text-white hover:bg-[#b6871f]"
                    >
                      Add Menu Item
                    </button>
                  </div>
                )}

                {menuExtracted && menuExtracted.length > 0 && (
                  <div className="mt-6 rounded-[32px] bg-gray-50 p-4 shadow-sm">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">Extracted Menu Items</h4>
                        <p className="text-sm text-gray-600">
                          Review and verify your scanned menu before completing registration.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 text-sm text-gray-700 shadow-sm">
                        Total items: <span className="font-semibold">{aggregateTotalItems()}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {menuExtracted.map((category, categoryIndex) => {
                        const isExpanded = expandedCategories.includes(categoryIndex);
                        return (
                          <div key={categoryIndex} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300">
                            <button
                              type="button"
                              onClick={() => toggleCategoryExpanded(categoryIndex)}
                              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                            >
                              <div>
                                <p className="text-sm uppercase tracking-[0.18em] text-[#C89A31]">
                                  Category
                                </p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{category.name || "Uncategorized"}</p>
                                <p className="text-sm text-gray-500">{category.items?.length || 0} items detected</p>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{isExpanded ? "Collapse" : "Expand"}</span>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5EC] text-[#7B5D02]">
                                  {isExpanded ? "−" : "+"}
                                </span>
                              </div>
                            </button>

                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isExpanded ? "max-h-[2000px]" : "max-h-0"
                              }`}
                            >
                              <div className="border-t border-gray-200 px-5 py-4">
                                <div className="overflow-x-auto">
                                  <table className="min-w-full table-auto border-collapse">
                                    <thead>
                                      <tr className="bg-[#F7F5EC] text-left text-sm text-gray-600">
                                        <th className="px-4 py-3">Item Name</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                      {category.items?.map((item, itemIndex) => {
                                        const isEditing =
                                          editingItem?.categoryIndex === categoryIndex &&
                                          editingItem?.itemIndex === itemIndex;
                                        return (
                                          <tr key={`${categoryIndex}-${itemIndex}`} className="bg-white">
                                            <td className="px-4 py-4 align-top">
                                              {isEditing ? (
                                                <input
                                                  value={editingName}
                                                  onChange={(e) => setEditingName(e.target.value)}
                                                  placeholder="Item name"
                                                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#C89A31]"
                                                />
                                              ) : (
                                                <p className="font-medium text-gray-900">{item.name || item.title || "Unnamed item"}</p>
                                              )}
                                            </td>
                                            <td className="px-4 py-4 align-top">
                                              {isEditing ? (
                                                <input
                                                  value={editingPrice}
                                                  onChange={(e) => setEditingPrice(e.target.value)}
                                                  placeholder="Enter price"
                                                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#C89A31]"
                                                />
                                              ) : (
                                                <span className="text-sm text-gray-600">
                                                  {getDisplayPrice(item.price)}
                                                </span>
                                              )}
                                            </td>
                                            <td className="px-4 py-4 align-top">
                                              {isEditing ? (
                                                <input
                                                  value={editingCategory}
                                                  onChange={(e) => setEditingCategory(e.target.value)}
                                                  placeholder="Category"
                                                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#C89A31]"
                                                />
                                              ) : (
                                                <span className="text-sm text-gray-600">{category.name || "Uncategorized"}</span>
                                              )}
                                            </td>
                                            <td className="px-4 py-4 align-top">
                                              {isEditing ? (
                                                <div className="flex flex-col gap-2 sm:flex-row">
                                                  <button
                                                    type="button"
                                                    onClick={saveEditedMenuItem}
                                                    className="rounded-2xl bg-[#C89A31] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b6871f]"
                                                  >
                                                    Save
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={cancelEditMenuItem}
                                                    className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#C89A31] hover:text-[#C89A31]"
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              ) : (
                                                <button
                                                  type="button"
                                                  onClick={() => startEditingMenuItem(categoryIndex, itemIndex)}
                                                  className="rounded-2xl border border-[#C89A31] bg-white px-4 py-2 text-sm font-semibold text-[#C89A31] transition hover:bg-[#F7F5EC]"
                                                >
                                                  Edit
                                                </button>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-8">
              {error && (
                <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
              )}
              {fraudWarning && (
                <div className="bg-yellow-50 p-4 rounded-2xl text-center mb-4 text-sm text-[#7A5E0B]">
                  {fraudWarning}
                </div>
              )}
              {activeStep === 3 && !isStep3Valid && (
                <div className="mb-4 text-sm text-red-600">
                  <p className="font-medium">Please fix the following before submitting:</p>
                  <ul className="mt-2 list-disc list-inside">
                    {Object.values(step3Errors).map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {activeStep > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep(activeStep - 1)}
                  disabled={isSubmitting}
                  className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#C89A31] hover:text-[#C89A31] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back
                </button>
              )}
                <button
                  type="button"
                  onClick={
                    activeStep === 1
                      ? handleContinueStep1
                      : activeStep === 2
                      ? handleContinueStep2
                      : handleCompleteRegistration
                  }
                  disabled={
                    isSubmitting ||
                    (activeStep === 1 && !isStep1Valid) ||
                    (activeStep === 2 && !isStep2Valid) ||
                    (activeStep === 3 && !isStep3Valid)
                  }
                  className={`w-full md:w-auto rounded-2xl px-8 py-4 text-base font-semibold text-white transition ${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-[#C89A31] hover:bg-[#b6871f]"
                  } cursor-pointer`}
                >
                  {isSubmitting
                    ? "Please wait..."
                    : activeStep === 3
                    ? "Submit"
                    : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default RestaurantOnboarding;

